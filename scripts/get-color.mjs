import puppeteer from 'puppeteer';
import path from 'path';

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('public/assets/step-01-3d.jpg').replace(/\\/g, '/');
  
  await page.goto(filePath);
  const colors = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const getP = (x, y) => {
      const p = ctx.getImageData(x, y, 1, 1).data;
      return {
        hex: '#' + [p[0], p[1], p[2]].map(v => v.toString(16).padStart(2, '0')).join(''),
        rgb: [p[0], p[1], p[2]]
      };
    };
    return {
      tl: getP(20, 20),
      tr: getP(img.naturalWidth - 20, 20),
      bl: getP(20, img.naturalHeight - 20),
      br: getP(img.naturalWidth - 20, img.naturalHeight - 20),
      midLeft: getP(20, Math.floor(img.naturalHeight / 2)),
      topMid: getP(Math.floor(img.naturalWidth / 2), 20)
    };
  });
  console.log(JSON.stringify(colors, null, 2));
  await browser.close();
}

main().catch(console.error);
