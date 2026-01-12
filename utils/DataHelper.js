export class DataHelper {
    static getRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static getValidContactPayload() {
        return {
            first_name: `User${this.getRandomString(3)}`,
            last_name: `Test${this.getRandomString(3)}`,
            email: `test-${this.getRandomString(5)}@example.com`,
            subject: 'webmaster',
            message: `Scalable test message for the automation framework demonstration. ${this.getRandomString(20)}`
        };
    }
}
