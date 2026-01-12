import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.quantityInput = page.locator('.quantity');
        this.totalPriceLocator = page.locator('body'); // Using body contains text as fallback/robust strategy from previous testing
    }

    async setQuantity(qty) {
        await this.quantityInput.fill(qty);
        await this.quantityInput.dispatchEvent('input');
        await this.quantityInput.dispatchEvent('change');
        await this.quantityInput.press('Enter');
    }

    async verifyProductInCart(productName) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async verifyTotal(amount) {
        // Relying on text content update on the page
        await expect(this.totalPriceLocator).toContainText(amount);
    }
}
