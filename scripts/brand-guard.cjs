/**
 * Blocks stray brand hex usage outside tokens and enforces gradient string.
 */
const { readFileSync, readdirSync, statSync } = require("fs");
const { join, extname, sep } = require("path");

const ROOT = process.cwd();
const TOKENS_FILE = join(ROOT, "styles/tokens/smh-champagne-tokens.css");
const GRAD = "linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)";
const HEXES = [/C2185B/i,/40C4B4/i,/D4AF37/i,/D94BC6/i,/00C2C7/i,/0B0D0F/i];

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
  for(const h of HEXES){
    if(h.test(txt)) violations.push({file, hex: h});
  }
  if(file.includes("brand") && txt.includes("linear-gradient(") && !txt.includes(GRAD)){
    violations.push({file, hex: "non-canonical-gradient"});
  }
}

const tokensBody = readFileSync(TOKENS_FILE, "utf8");
if(!tokensBody.includes(`--smh-gradient:${GRAD};`)){
  violations.push({file: TOKENS_FILE, hex: "gradient-string-mismatch"});
}

if(violations.length){
  console.error("❌ Brand guard failed. Move brand hexes/gradient into tokens only.");
  for(const v of violations) console.error("-", v.file, String(v.hex));
  process.exit(1);
}
console.log("✅ Brand guard passed.");
