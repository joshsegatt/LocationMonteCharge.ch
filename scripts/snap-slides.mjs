import puppeteer from 'puppeteer';

async function snapSlides() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/#realisations', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Click next button to view slide 2 (real-geneva-2.webp)
  const nextBtn = await page.$('button[aria-label="Photo suivante"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    const el = await page.$('#realisations');
    if (el) {
      await el.screenshot({ path: 'C:/Users/Joshsegatt/.gemini/antigravity/brain/3b18d1d6-75ef-4532-a616-4f9301d5d5d0/slide-2-desktop.png' });
      console.log('Saved slide-2-desktop.png');
    }

    // Click next button again to view slide 3 (real-geneva-3.webp)
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    if (el) {
      await el.screenshot({ path: 'C:/Users/Joshsegatt/.gemini/antigravity/brain/3b18d1d6-75ef-4532-a616-4f9301d5d5d0/slide-3-desktop.png' });
      console.log('Saved slide-3-desktop.png');
    }
  }

  await browser.close();
}

snapSlides().catch(console.error);
