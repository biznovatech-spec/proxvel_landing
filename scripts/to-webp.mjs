// One-shot JPG → WebP converter for /public/images.
// Resizes oversized photos to a sane max width and writes quality-82 WebP.
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const DIR = new URL('../public/images/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MAX_W = 2000; // hero/full-bleed never needs more than this on the web
const QUALITY = 82;

const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f));
let before = 0;
let after = 0;

for (const file of files) {
  const src = join(DIR, file);
  const out = join(DIR, `${parse(file).name}.webp`);
  const { size: inSize } = await stat(src);

  const img = sharp(src);
  const meta = await img.metadata();
  const pipeline = meta.width > MAX_W ? img.resize({ width: MAX_W }) : img;
  await pipeline.webp({ quality: QUALITY }).toFile(out);

  const { size: outSize } = await stat(out);
  before += inSize;
  after += outSize;
  const pct = ((1 - outSize / inSize) * 100).toFixed(0);
  console.log(`${file.padEnd(24)} ${(inSize / 1e6).toFixed(2)}MB -> ${(outSize / 1e6).toFixed(2)}MB  (-${pct}%)`);
}

console.log('—'.repeat(40));
console.log(`TOTAL  ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB  (-${((1 - after / before) * 100).toFixed(0)}%)`);
