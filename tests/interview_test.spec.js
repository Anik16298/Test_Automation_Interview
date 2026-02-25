import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { ApiClient } from '../api/ApiClient';
import { Config } from '../utils/Config';
import { DataHelper } from '../utils/DataHelper';
import { Logger } from '../utils/Logger';

test.describe('UI Layer Tests', () => {

    test('Form Submission Validation (UI)', async ({ page }) => {
        const contactPage = new ContactPage(page);
        Logger.log('Starting Form Submission Validation (UI) test');

        await contactPage.navigate();

        Logger.log('Verifying empty form validation');
        await contactPage.submitForm();
        await contactPage.verifyValidationErrors();

        Logger.log('Submitting form with valid data');
        const data = DataHelper.getValidContactPayload();

        // Keep names explicit because UI form fields are first-name/last-name, while payload helper returns contact data.
        await contactPage.submitForm(
            'John',
            'Doe',
            data.email,
            data.subject,
            data.message
        );

        await contactPage.verifySuccessMessage(Config.testData.contactSuccessMsg);
        Logger.log('Form Submission Validation (UI) test passed');
    });

    test('Add to Cart and Update (UI)', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const productName = Config.testData.productName;

        Logger.log(`Starting Add to Cart and Update (UI) test for ${productName}`);

        await homePage.navigate();
        await homePage.selectProduct(productName);

        await productPage.addToCart();
        await productPage.verifyCartBadge('1');

        await productPage.navigateToCart();
        await cartPage.verifyProductInCart(productName);

        Logger.log('Updating quantity to 3');
        await cartPage.setQuantity('3');

        await cartPage.verifyTotal('42.45');
        Logger.log('Add to Cart and Update (UI) test passed');
    });

});

test.describe('API Layer Tests', () => {
    test('Form Submission (API)', async ({ request }) => {
        const apiClient = new ApiClient(request);
        const payload = DataHelper.getValidContactPayload();

        Logger.log('Sending POST request to /messages API');
        const response = await apiClient.submitContactMessage(payload);
        const responseStatus = response.status();
        const responseBody = await response.text();

        if (responseStatus !== 200 && responseStatus !== 201) {
            Logger.error(`API Failure (${responseStatus}): ${responseBody}`);
        }

        // Include response body in assertion message to speed up API failure triage.
        expect([200, 201], `Expected 200 or 201 but got ${responseStatus}. Body: ${responseBody}`).toContain(responseStatus);

        const body = JSON.parse(responseBody);
        // Contract is tolerant on fields; enforce only that the response is valid JSON object.
        expect(typeof body).toBe('object');
        Logger.log(`API test passed with response body: ${responseBody}`);
    });
});
