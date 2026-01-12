import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToCartButton = page.locator('#btn-add-to-cart');
        this.cartLink = page.locator('a[aria-label="cart"]');
    }

    async addToCart() {
        // Wait for response to ensure backend state consistency
        await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('cart') && (resp.status() === 200 || resp.status() === 201)),
            this.addToCartButton.click()
        ]);
    }

    async verifyCartBadge(count) {
        await expect(this.cartLink).toContainText(count);
    }

    async navigateToCart() {
        await this.cartLink.click();
    }
}
