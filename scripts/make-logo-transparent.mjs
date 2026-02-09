/**
 * Rend le fond noir du logo transparent et enregistre dans public/logo.png
 * Usage: node scripts/make-logo-transparent.mjs
 */
import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Chemins possibles du logo source
const sourcePaths = [
  join(root, 'assets', 'SCOD_VTC-02-bafb76d3-5cc8-4346-9168-b7934b587403.png'),
  join(root, '.cursor', 'projects', 'Users-clever-vtc-senegal-main', 'assets', 'SCOD_VTC-02-bafb76d3-5cc8-4346-9168-b7934b587403.png'),
  join(process.env.HOME || '', '.cursor', 'projects', 'Users-clever-vtc-senegal-main', 'assets', 'SCOD_VTC-02-bafb76d3-5cc8-4346-9168-b7934b587403.png'),
];

const sourcePath = sourcePaths.find(p => existsSync(p));
if (!sourcePath) {
  console.error('Logo source introuvable. Placez SCOD_VTC-02-....png dans assets/ ou exécutez depuis le bon répertoire.');
  process.exit(1);
}

const outPath = join(root, 'public', 'logo.png');
const BLACK_THRESHOLD = 15; // Seul le noir pur / quasi noir devient transparent (évite de toucher au bleu marine)

async function main() {
  const { data, info } = await sharp(sourcePath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      data[i + 3] = 0; // alpha = 0
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outPath);

  console.log('Logo avec fond transparent enregistré:', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
