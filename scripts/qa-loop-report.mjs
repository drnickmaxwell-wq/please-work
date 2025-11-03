import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const SEARCH_ROOTS = ['public'];
const IGNORED_DIRS = new Set(['.git', 'node_modules', '.next']);
const FRAME_THRESHOLD = 8;

async function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {cwd: repoRoot, ...options});
    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (chunk) => {
      stdout += chunk;
    });

    child.stderr?.on('data', (chunk) => {
      stderr += chunk;
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({stdout, stderr, code});
      } else {
        const error = new Error(`Command failed: ${command} ${args.join(' ')} (code ${code})`);
        error.stdout = stdout;
        error.stderr = stderr;
        error.code = code;
        reject(error);
      }
    });
  });
}

async function commandExists(command) {
  try {
    await runCommand(command, ['-version']);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    return false;
  }
}

async function findWebmFiles(baseDir) {
  const results = [];

  async function walk(current) {
    const entries = await fs.readdir(current, {withFileTypes: true});
    for (const entry of entries) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.webm')) {
        results.push(fullPath);
      }
    }
  }

  await Promise.all(
    baseDir.map(async (rootSegment) => {
      const absolute = path.join(repoRoot, rootSegment);
      try {
        const stat = await fs.stat(absolute);
        if (stat.isDirectory()) {
          await walk(absolute);
        }
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
    }),
  );

  return results.sort();
}

async function analyzeWithFFProbe(file) {
  const args = [
    '-v',
    'error',
    '-f',
    'lavfi',
    '-i',
    `movie=${file},signalstats`,
    '-show_entries',
    'frame=pkt_pts_time:frame_tags=lavfi.signalstats.YAVG',
    '-show_frames',
    '-of',
    'json',
  ];

  try {
    const {stdout} = await runCommand('ffprobe', args);
    const parsed = JSON.parse(stdout);
    const frames = Array.isArray(parsed?.frames) ? parsed.frames : [];
    const luminance = frames
      .map((frame) => Number.parseFloat(frame?.tags?.['lavfi.signalstats.YAVG']))
      .filter((value) => Number.isFinite(value));

    if (luminance.length < 2) {
      return {
        status: 'insufficient-data',
        seam_delta: null,
        crossfade_ms: null,
        method: 'ffprobe-signalstats',
        details: {framesAnalyzed: luminance.length},
        note: 'Signalstats filter did not yield enough frames.',
      };
    }

    const first = luminance[0];
    const last = luminance[luminance.length - 1];
    const seamDelta = Math.abs(last - first);
    const crossfade = recommendCrossfade(seamDelta);

    return {
      status: 'ok',
      seam_delta: Number(seamDelta.toFixed(2)),
      crossfade_ms: crossfade,
      method: 'ffprobe-signalstats',
      details: {
        framesAnalyzed: luminance.length,
        firstLuma: Number(first.toFixed(2)),
        lastLuma: Number(last.toFixed(2)),
      },
      note: crossfade > 0 ? 'Consider applying a cross-fade at loop seam.' : 'Loop seam appears clean.',
    };
  } catch (error) {
    return {
      status: 'ffprobe-error',
      seam_delta: null,
      crossfade_ms: null,
      method: 'ffprobe-signalstats',
      details: {error: error.stderr || error.message},
      note: 'ffprobe failed to compute signal statistics.',
    };
  }
}

function recommendCrossfade(delta) {
  if (!Number.isFinite(delta)) {
    return null;
  }
  if (delta <= FRAME_THRESHOLD) {
    return 0;
  }

  const normalized = Math.min(1, (delta - FRAME_THRESHOLD) / 40);
  const duration = 120 + normalized * 380;
  return Math.round(duration);
}

async function attemptFallbackHash() {
  const attemptedModules = ['@ffmpeg.wasm/main', '@ffmpeg.wasm/ffmpeg', 'node-webm'];
  const errors = [];
  for (const mod of attemptedModules) {
    try {
      await import(mod);
      return {available: true, module: mod};
    } catch (error) {
      errors.push(`${mod}: ${error.message}`);
    }
  }
  return {available: false, errors};
}

function buildToolingSummary({ffprobeAvailable, fallbackInfo}) {
  const summary = [];
  summary.push(`- ffprobe: ${ffprobeAvailable ? 'available' : 'unavailable'}`);
  if (fallbackInfo.available) {
    summary.push(`- fallback hashing: available via ${fallbackInfo.module}`);
  } else {
    summary.push('- fallback hashing: unavailable');
  }
  return summary.join('\n');
}

async function main() {
  const webmFiles = await findWebmFiles(SEARCH_ROOTS);
  const ffprobeAvailable = await commandExists('ffprobe');
  const fallbackInfo = await attemptFallbackHash();
  const results = [];

  for (const file of webmFiles) {
    const relativePath = path.relative(repoRoot, file);

    if (ffprobeAvailable) {
      const analysis = await analyzeWithFFProbe(file);
      results.push({clip: relativePath, threshold: FRAME_THRESHOLD, ...analysis});
      continue;
    }

    if (fallbackInfo.available) {
      results.push({
        clip: relativePath,
        threshold: FRAME_THRESHOLD,
        status: 'pending-fallback',
        seam_delta: null,
        crossfade_ms: null,
        method: fallbackInfo.module,
        note: 'Fallback hashing module is available but not yet implemented.',
      });
      continue;
    }

    results.push({
      clip: relativePath,
      threshold: FRAME_THRESHOLD,
      status: 'tool-unavailable',
      seam_delta: null,
      crossfade_ms: null,
      method: 'manual-review',
      note: 'Install ffmpeg (ffprobe) locally or request Manus for a re-export with tighter loop seams.',
    });
  }

  const toolSummary = buildToolingSummary({ffprobeAvailable, fallbackInfo});
  const markdown = renderMarkdown(results, toolSummary, fallbackInfo);
  const reportPath = path.join(repoRoot, 'reports', 'loop-seams.md');
  await fs.writeFile(reportPath, markdown, 'utf8');

  if (results.length === 0) {
    console.log('No .webm clips found for analysis.');
  } else {
    console.log(`Loop seam report generated for ${results.length} clip(s).`);
  }
}

function renderMarkdown(results, toolSummary, fallbackInfo) {
  const lines = [];
  lines.push('# Loop Seam QA Report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Tooling');
  lines.push('');
  lines.push(toolSummary);
  if (!fallbackInfo.available && fallbackInfo.errors?.length) {
    lines.push('');
    lines.push('<details>');
    lines.push('<summary>Fallback module load errors</summary>');
    lines.push('');
    for (const err of fallbackInfo.errors) {
      lines.push(`- ${err}`);
    }
    lines.push('');
    lines.push('</details>');
  }
  lines.push('');
  lines.push('## Clip Summary');
  lines.push('');
  lines.push('| Clip | Status | Seam Delta | Crossfade (ms) | Notes |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const entry of results) {
    const seam = entry.seam_delta === null ? 'n/a' : entry.seam_delta.toFixed(2);
    const crossfade = entry.crossfade_ms ?? 'n/a';
    lines.push(
      `| ${entry.clip} | ${entry.status} | ${seam} | ${crossfade} | ${entry.note ?? ''} |`,
    );
  }
  lines.push('');
  lines.push('```json');
  lines.push(JSON.stringify(results, null, 2));
  lines.push('```');
  lines.push('');
  lines.push('> Threshold (ΔYAVG): ' + FRAME_THRESHOLD);
  lines.push('');
  lines.push(
    'If tooling remains unavailable, request Manus to re-export loops with matching first/last frames or supply raw frame sequences.',
  );
  lines.push('');
  return lines.join('\n');
}

main().catch((error) => {
  console.error('Failed to generate loop seam report.');
  console.error(error);
  process.exitCode = 1;
});
