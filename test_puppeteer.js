const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto('http://localhost:3000/asenasaribatur?edit=true', { waitUntil: 'networkidle2' });
    console.log("Navigated");

    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find(b => b.textContent && b.textContent.includes('ADD PRODUCT'));
        if (addBtn) addBtn.click();
    });
    console.log("Clicked ADD PRODUCT");
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const catBtn = btns.find(b => b.textContent && b.textContent.includes('Katalogdan Seç'));
        if (catBtn) catBtn.click();
    });
    console.log("Clicked Katalogdan Sec");
    await page.waitForTimeout(1000);

    await page.type('input[placeholder*="ara"]', 'Ruj');
    console.log("Typed Ruj");
    await page.waitForTimeout(4000);
    
    const urunlerExists = await page.evaluate(() => {
        return !!Array.from(document.querySelectorAll('h4')).find(h => h.textContent === 'Ürünler');
    });
    console.log("Ürünler exists:", urunlerExists);
    
    await browser.close();
})();
