import puppeteer from 'puppeteer';

async function runAudit() {
  const browser = await puppeteer.launch({ headless: true });
  const viewports = [
    { name: 'Mobile Small (iPhone SE)', width: 375, height: 667 },
    { name: 'Mobile Standard (iPhone 14/15/Pixel)', width: 390, height: 844 },
    { name: 'Mobile Large (iPhone Pro Max/Galaxy Ultra)', width: 430, height: 932 },
    { name: 'Tablet Portrait (iPad Mini/Air)', width: 768, height: 1024 },
    { name: 'Tablet Landscape (iPad Pro)', width: 1024, height: 768 },
    { name: 'Laptop (MacBook Air/Pro)', width: 1280, height: 800 },
    { name: 'Desktop Full HD', width: 1920, height: 1080 },
    { name: 'Ultra-Wide 2K/4K', width: 2560, height: 1440 }
  ];

  const results = [];
  for (const vp of viewports) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });

    const metrics = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const bodyW = document.body.scrollWidth;
      const hasHorizontalScroll = docW > winW || bodyW > winW;
      
      const overflowElements = [];
      if (hasHorizontalScroll) {
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > winW + 1) {
            overflowElements.push({
              tag: el.tagName,
              id: el.id,
              className: (el.className || '').toString().slice(0, 50),
              right: Math.round(rect.right),
              winW
            });
          }
        });
      }

      return {
        docW,
        winW,
        bodyW,
        hasHorizontalScroll,
        overflowCount: overflowElements.length,
        overflowSample: overflowElements.slice(0, 3)
      };
    });

    results.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      hasOverflow: metrics.hasHorizontalScroll,
      scrollWidthDiff: metrics.docW - metrics.winW,
      consoleErrors
    });

    await page.close();
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

runAudit().catch(console.error);
