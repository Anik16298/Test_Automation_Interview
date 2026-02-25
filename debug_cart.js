import { chromium } from '@playwright/test';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://practicesoftwaretesting.com');

    await page.getByText('Combination Pliers').first().click();
    await page.locator('#btn-add-to-cart').click();
    await page.locator('a[aria-label="cart"]').click();

    const cartRow = page.locator('tbody tr').first();
    const qtyInput = cartRow.locator('input[type="number"]');
    const totalCell = page.locator('tr:has(strong:has-text("Total")) td').nth(3);

    console.log('Initial quantity:', await qtyInput.inputValue());
    console.log('Initial total:', await totalCell.textContent());

    await qtyInput.fill('3');
    await qtyInput.blur();

    console.log('Updated quantity:', await qtyInput.inputValue());
    console.log('Updated total:', await totalCell.textContent());

    await browser.close();
})();
