import puppeteer from 'puppeteer';

async function snap() {
  const browser = await puppeteer.launch({ headless: 'new' });

  // 1. Desktop
  const pageDesk = await browser.newPage();
  await pageDesk.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await pageDesk.goto('http://localhost:3000/#realisations', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  const elDesk = await pageDesk.$('#realisations');
  if (elDesk) {
    await elDesk.screenshot({ path: 'C:/Users/Joshsegatt/.gemini/antigravity/brain/3b18d1d6-75ef-4532-a616-4f9301d5d5d0/realisations-desktop.png' });
    console.log('Saved realisations-desktop.png');
  }

  // 2. Mobile
  const pageMob = await browser.newPage();
  await pageMob.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await pageMob.goto('http://localhost:3000/#realisations', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  const elMob = await pageMob.$('#realisations');
  if (elMob) {
    await elMob.screenshot({ path: 'C:/Users/Joshsegatt/.gemini/antigravity/brain/3b18d1d6-75ef-4532-a616-4f9301d5d5d0/realisations-mobile.png' });
    console.log('Saved realisations-mobile.png');
  }

  await browser.close();
}

snap().catch(console.error);
