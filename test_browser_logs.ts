import { chromium } from 'playwright-core';

async function run() {
  const browser = await chromium.launch({ 
    headless: true, 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' 
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log("Navigating to editor...");
  await page.goto('http://localhost:3000/asenasaribatur?edit=true');
  await page.waitForTimeout(2000);
  
  const addBtn = page.getByText('ADD PRODUCT').first();
  await addBtn.click();
  await page.waitForTimeout(1000);

  const katalogBtn = page.getByText('Katalogdan Seç');
  await katalogBtn.click();
  await page.waitForTimeout(1000);

  console.log("Typing 'Ruj'...");
  const searchInput = page.locator('input[placeholder="Marka, ürün veya kategori ara..."]');
  await searchInput.fill('Ruj');
  
  await page.waitForTimeout(3000);
  
  console.log("Checking for 'Ürünler'...");
  const hasUrunler = await page.getByText('Ürünler').isVisible();
  console.log("Urunler section visible?", hasUrunler);

  await browser.close();
}
run().catch(console.error);
