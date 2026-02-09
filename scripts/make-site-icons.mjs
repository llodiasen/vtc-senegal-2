/**
 * Génère les icônes du site (favicon, PWA) à partir de l'icône SCOD VTC
 * Usage: node scripts/make-site-icons.mjs
 */
import sharp from 'sharp';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const iconsDir = join(publicDir, 'icons');

const BLACK_THRESHOLD = 15;

const sourcePaths = [
  join(root, 'assets', 'SCOD_VTC-09-758ea065-ee5b-4382-9f9d-aea7698078c8.png'),
  join(process.env.HOME || '', '.cursor', 'projects', 'Users-clever-vtc-senegal-main', 'assets', 'SCOD_VTC-09-758ea065-ee5b-4382-9f9d-aea7698078c8.png'),
];

const sourcePath = sourcePaths.find(p => existsSync(p));
if (!sourcePath) {
  console.error('Image source introuvable. Placez SCOD_VTC-09-....png dans assets/');
  process.exit(1);
}

async function makeTransparentPng(inputPath) {
  const { data, info } = await sharp(inputPath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      data[i + 3] = 0;
    }
  }
  return sharp(data, { raw: { width, height, channels: 4 } }).png();
}

async function main() {
  const png = await makeTransparentPng(sourcePath);

  if (!existsSync(iconsDir)) {
    const fs = await import('fs');
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  await png.clone().resize(32, 32).toFile(join(publicDir, 'favicon.png'));
  await png.clone().resize(192, 192).toFile(join(iconsDir, 'icon-192x192.png'));
  await png.clone().resize(512, 512).toFile(join(iconsDir, 'icon-512x512.png'));
  await png.clone().resize(180, 180).toFile(join(iconsDir, 'apple-touch-icon.png'));

  console.log('Icônes du site générées: favicon.png, icon-192, icon-512, apple-touch-icon');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
