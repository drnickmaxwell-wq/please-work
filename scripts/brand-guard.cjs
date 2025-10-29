/**
 * Blocks stray brand hex usage outside tokens and enforces gradient string.
 */
const { readFileSync, readdirSync, statSync } = require("fs");
const { join, extname, sep } = require("path");

const ROOT = process.cwd();
const TOKENS_FILE = join(ROOT, "styles/tokens/smh-champagne-tokens.css");
const CANONICAL_DISPLAY = "linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)";
const CANONICAL_GRAD = CANONICAL_DISPLAY.replace(/\s+/g, "").toLowerCase();
const HEXES = [/C2185B/i,/40C4B4/i,/D4AF37/i,/D94BC6/i,/00C2C7/i,/0B0D0F/i];

const normalize = (value) => value.replace(/\s+/g, "").toLowerCase();

function walk(dir){
  return readdirSync(dir).flatMap(f=>{
    const p=join(dir,f);
    const s=statSync(p);
    if(s.isDirectory()) return walk(p);
    return [p];
  });
}

const files = walk(ROOT).filter(p=>{
  const e = extname(p).toLowerCase();
  // limit to code & styles
  return [".js",".ts",".jsx",".tsx",".css",".scss",".mdx"].includes(e);
});

let violations = [];

const NEXT_SEGMENT = `${sep}.next${sep}`;

for(const file of files){
  if(
    file.includes("node_modules") ||
    file.includes(NEXT_SEGMENT) ||
    file.includes("/.next/")
  ) continue;
  if(file === __filename) continue;
  if(file === TOKENS_FILE) continue;

  const txt = readFileSync(file,"utf8");
  const normalized = normalize(txt);
  for(const h of HEXES){
    if(h.test(txt)) violations.push({file, hex: h});
  }
  if(file.includes("brand") && normalized.includes("linear-gradient(") && !normalized.includes(CANONICAL_GRAD)){
    const gradientMatch = txt.match(/linear-gradient\([^)]*\)/i);
    const raw = gradientMatch ? gradientMatch[0].trim() : "";
    violations.push({
      file,
      hex: "non-canonical-gradient",
      expected: CANONICAL_DISPLAY,
      found: raw,
      normalizedExpected: CANONICAL_GRAD,
      normalizedFound: raw ? normalize(raw) : "",
    });
  }
}

const tokensBody = readFileSync(TOKENS_FILE, "utf8");
const gradientMatch = tokensBody.match(/--smh-gradient:\s*([^;]+);/i);
if(!gradientMatch){
  violations.push({file: TOKENS_FILE, hex: "gradient-string-missing"});
} else {
  const gradientRaw = gradientMatch[1].trim();
  const gradientNormalized = normalize(gradientRaw);
  if(gradientNormalized !== CANONICAL_GRAD){
    violations.push({
      file: TOKENS_FILE,
      hex: "gradient-string-mismatch",
      expected: CANONICAL_DISPLAY,
      found: gradientRaw,
      normalizedExpected: CANONICAL_GRAD,
      normalizedFound: gradientNormalized,
    });
  }
}

if(violations.length){
  console.error("❌ Brand guard failed. Move brand hexes/gradient into tokens only.");
  for(const v of violations){
    if(v.expected){
      console.error(`- ${v.file} ${String(v.hex)} → expected "${v.expected}" but found "${v.found || 'unknown'}"`);
      if(v.normalizedExpected || v.normalizedFound){
        console.error(`  normalized expected: "${v.normalizedExpected ?? ''}" vs found: "${v.normalizedFound ?? ''}"`);
      }
    } else {
      console.error("-", v.file, String(v.hex));
    }
  }
  process.exit(1);
}
console.log("✅ Brand guard passed.");
