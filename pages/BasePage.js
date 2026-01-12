import { Config } from '../utils/Config';

export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(path = '/') {
        await this.page.goto(`${Config.baseUrl}${path}`);
    }
}
