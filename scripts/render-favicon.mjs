import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SIZES = [
  { file: 'favicon-512x512.png', size: 512 },
  { file: 'favicon-192x192.png', size: 192 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'favicon-96x96.png', size: 96 },
  { file: 'favicon-48x48.png', size: 48 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'favicon-16x16.png', size: 16 }
];

async function generate() {
  const svgPath = path.resolve('public/favicon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf-8');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const { file, size } of SIZES) {
    const page = await browser.newPage();
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    
    await page.setContent(`<!DOCTYPE html>
<html>
  <head>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: ${size}px;
        height: ${size}px;
        background: transparent !important;
        overflow: hidden;
      }
      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    </style>
  </head>
  <body>
    ${svgContent}
  </body>
</html>`);

    const outPath = path.resolve('public', file);
    await page.screenshot({
      path: outPath,
      omitBackground: true,
      type: 'png'
    });
    console.log(`Generated transparent ${file} (${size}x${size})`);
    await page.close();
  }

  await browser.close();
  console.log('All PNG favicons generated with true transparency!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
