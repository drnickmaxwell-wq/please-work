/**
 * Blocks stray brand hex usage outside tokens and enforces gradient string.
 */
const { readFileSync, readdirSync, statSync } = require("fs");
const { join, extname, sep } = require("path");

const ROOT = process.cwd();
const TOKENS_FILE = join(ROOT, "styles/tokens/smh-champagne-tokens.css");
const CANONICAL_GRADIENT = "linear-gradient(135deg,#d94bc60%,#00c2c7100%)";
const HEXES = [/C2185B/i,/40C4B4/i,/D4AF37/i,/D94BC6/i,/00C2C7/i,/0B0D0F/i];

function normalizeGradient(input){
  return (input || "").replace(/\s+/g, "").toLowerCase();
}

function extractGradient(body){
  const match = body.match(/--smh-gradient\s*:\s*([^;]+);/i);
  return match ? match[1].trim() : null;
}

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

const violations = [];

function addViolation(file, detail){
  violations.push({ file, detail });
}

const NEXT_SEGMENT = `${sep}.next${sep}`;

for(const file of files){
  if(
    file.includes("node_modules") ||
    file.includes(NEXT_SEGMENT) ||
    file.includes("/.next/") ||
    file.includes(`${sep}styles${sep}tokens${sep}`)
  ) continue;
  if(file === __filename) continue;
  if(file === TOKENS_FILE) continue;

  const txt = readFileSync(file,"utf8");
  for(const h of HEXES){
    if(h.test(txt)) addViolation(file, `brand hex detected: ${h}`);
  }
  if(file.includes("brand")){
    const gradients = txt.match(/linear-gradient\([^)]*\)/gi) || [];
    for(const raw of gradients){
      if(normalizeGradient(raw) !== CANONICAL_GRADIENT){
        addViolation(file, `non-canonical gradient detected: ${raw}`);
      }
    }
  }
}

const tokensBody = readFileSync(TOKENS_FILE, "utf8");
const tokenGradient = extractGradient(tokensBody);
const normalizedTokenGradient = normalizeGradient(tokenGradient);

if(!tokenGradient){
  addViolation(TOKENS_FILE, "missing --smh-gradient definition");
}else if(normalizedTokenGradient !== CANONICAL_GRADIENT){
  addViolation(TOKENS_FILE, {
    expected: CANONICAL_GRADIENT,
    found: tokenGradient,
  });
}

if(violations.length){
  console.error("❌ Brand guard failed. Move brand hexes/gradient into tokens only.");
  for(const violation of violations){
    console.error("-", violation.file);
    if(typeof violation.detail === "string"){
      console.error("  ", violation.detail);
    }else if(violation.detail && typeof violation.detail === "object"){
      if(violation.detail.expected){
        console.error("  Expected:", violation.detail.expected);
      }
      if(violation.detail.found){
        console.error("  Found:", violation.detail.found);
      }
    }
  }
  process.exit(1);
}
console.log("✅ Brand guard passed.");
