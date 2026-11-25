import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const files = [
  "index.html",
  "ad.png",
  path.join("panel", "rogue.png"),
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const dest = path.join(outDir, file);
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(file, dest);
  const { size } = await stat(dest);
  console.log(`${file} -> ${dest} (${(size / 1024).toFixed(1)} KB)`);
}
