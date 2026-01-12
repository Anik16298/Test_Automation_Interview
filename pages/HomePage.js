import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
    }

    async selectProduct(productName) {
        // Using first() as there might be multiple items or structure quirks, keeping consistent with previous successful locator strategy
        await this.page.getByText(productName).first().click();
    }
}
