import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3000/dashboard/connected-accounts');
  await page.waitForTimeout(2000);
  console.log("Connected Accounts title:", await page.title());

  await page.goto('http://localhost:3000/dashboard/earnings');
  await page.waitForTimeout(2000);
  console.log("Earnings title:", await page.title());

  await page.goto('http://localhost:3000/dashboard/collaborations');
  await page.waitForTimeout(2000);
  console.log("Collaborations title:", await page.title());

  const errorOverlay = page.locator('nextjs-portal');
  if (await errorOverlay.isVisible()) {
      console.log("NEXT.JS ERROR OVERLAY FOUND");
      console.log(await errorOverlay.innerText());
  } else {
      console.log("NO NEXT.JS ERROR OVERLAY");
  }

  await browser.close();
})();
