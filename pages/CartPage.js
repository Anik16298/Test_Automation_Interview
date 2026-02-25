import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartRow = page.locator('tbody tr').first();
        this.quantityInput = this.cartRow.locator('input[type="number"]');
        this.orderTotalCell = page.locator('tr:has(strong:has-text("Total")) td').nth(3);
    }

    async setQuantity(qty) {
        await this.quantityInput.waitFor({ state: 'visible' });
        await this.quantityInput.click();
        await this.quantityInput.fill(qty);
        await this.quantityInput.blur();

        // Cart row is re-rendered by the app after quantity update.
        await expect(this.cartRow.locator('input[type="number"]')).toHaveValue(qty);
    }

    async verifyProductInCart(productName) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async verifyTotal(amount) {
        await expect(this.orderTotalCell).toContainText(amount);
    }
}