const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKEN_FILES = new Set([
  path.join('styles', 'tokens', 'smh-champagne-tokens.css'),
  path.join('styles', 'tokens.css'),
]);
const HEX_VALUES = ['D94BC6', '00C2C7', 'C2185B', '40C4B4', 'D4AF37'].map((value) => `#${value}`);
const GRADIENT_EXPECTATION = ['linear-gradient(135deg,#', 'D94BC6 0%,#', '00C2C7 100%)'].join('');

const SKIP_DIRS = new Set(['.git', '.next', 'docs', 'node_modules', 'out', 'reports', 'dist']);
const SKIP_FILE_EXTENSIONS = new Set(['.md', '.diff']);

let failed = false;

function readText(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.includes(0)) {
    return null;
  }
  return buffer.toString('utf8');
}

function walkDir(dir, visitor) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walkDir(path.join(dir, entry.name), visitor);
    } else {
      visitor(path.join(dir, entry.name));
    }
  }
}

function report(message) {
  console.error(`✖ ${message}`);
  failed = true;
}

const gradientFailures = [];
let gradientFound = false;
for (const relPath of TOKEN_FILES) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    gradientFailures.push(`Missing token file: ${relPath}`);
    continue;
  }
  const contents = readText(fullPath);
  if (contents && contents.includes(`--smh-gradient:${GRADIENT_EXPECTATION};`)) {
    gradientFound = true;
  }
}

if (!gradientFound) {
  gradientFailures.push(`Expected --smh-gradient:${GRADIENT_EXPECTATION}; in token sources`);
}

gradientFailures.forEach(report);

const hexViolations = [];

walkDir(ROOT, (filePath) => {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (TOKEN_FILES.has(relPath)) return;
  const ext = path.extname(relPath).toLowerCase();
  if (SKIP_FILE_EXTENSIONS.has(ext)) return;
  const contents = readText(filePath);
  if (!contents) return;
  const lower = contents.toLowerCase();
  const lines = contents.split(/\r?\n/);
  HEX_VALUES.forEach((hex) => {
    const needle = hex.toLowerCase();
    if (!lower.includes(needle)) return;
    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(needle)) {
        hexViolations.push({ file: relPath, line: index + 1, hex });
      }
    });
  });
});

if (hexViolations.length > 0) {
  const messages = Array.from(
    new Set(
      hexViolations.map((violation) => `${violation.file}:${violation.line} contains ${violation.hex}`),
    ),
  );
  for (const message of messages) {
    report(message);
  }
}

if (!failed) {
  console.log('✔ Champagne guardrails intact');
}

process.exitCode = failed ? 1 : 0;
