import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const files = [
  "index.html",
  "ad.png",
  path.join("panel", "rogue.png"),
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const src = path.resolve(scriptDir, file);
  const dest = path.join(outDir, file);
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(src, dest);
  const { size } = await stat(dest);
  console.log(`${file} -> ${dest} (${(size / 1024).toFixed(1)} KB)`);
}
