import puppeteer from 'puppeteer';

async function verify() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText,
      waLinks: Array.from(document.querySelectorAll('a[href*="wa.me"]')).map(a => a.href),
      telLinks: Array.from(document.querySelectorAll('a[href*="tel:"]')).map(a => a.href)
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

verify().catch(console.error);
