import { test, expect } from '@playwright/test';

test('debug cart selectors', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await page.getByText('Combination Pliers').first().click();
    await page.locator('#btn-add-to-cart').click();
    await page.locator('a[aria-label="cart"]').click();

    const cartRow = page.locator('tbody tr').first();
    const qtyInput = cartRow.locator('input[type="number"]');
    const totalCell = page.locator('tr:has(strong:has-text("Total")) td').nth(3);

    await expect(qtyInput).toHaveValue('1');
    await expect(totalCell).toContainText('14.15');

    await qtyInput.fill('3');
    await qtyInput.blur();

    await expect(qtyInput).toHaveValue('3');
    await expect(totalCell).toContainText('42.45');
});
