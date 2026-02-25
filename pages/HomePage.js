import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
    }

    async selectProduct(productName) {
        // Product cards can expose duplicate text nodes; use the first visible match for stable navigation.
        await this.page.getByText(productName).first().click();
    }
}
