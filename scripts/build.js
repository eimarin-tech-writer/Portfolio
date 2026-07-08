// Minimal static build: copy everything in src/ to dist/.
// No framework, no bundler, just a reproducible output folder for deploy.
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "src");
const DIST = path.join(__dirname, "..", "dist");

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
copyDir(SRC, DIST);
console.log(`Built ${SRC} -> ${DIST}`);
