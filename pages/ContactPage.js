import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ContactPage extends BasePage {
    constructor(page) {
        super(page);
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.emailInput = page.locator('#email');
        this.subjectSelect = page.locator('#subject');
        this.messageInput = page.locator('#message');
        this.sendButton = page.getByRole('button', { name: 'Send' });
        this.successAlert = page.locator('.alert-success');
        this.validationErrors = {
            firstName: page.getByText('First name is required'),
            lastName: page.getByText('Last name is required'),
            email: page.getByText('Email is required'),
            subject: page.getByText('Subject is required'),
            message: page.getByText('Message is required'),
        };
    }

    async navigate() {
        await super.navigate('/contact');
    }

    async submitForm(firstName, lastName, email, subject, message) {
        if (firstName) await this.firstNameInput.fill(firstName);
        if (lastName) await this.lastNameInput.fill(lastName);
        if (email) await this.emailInput.fill(email);
        if (subject) await this.subjectSelect.selectOption(subject);
        if (message) await this.messageInput.fill(message);
        await this.sendButton.click();
    }

    async verifyValidationErrors() {
        for (const error of Object.values(this.validationErrors)) {
            await expect(error).toBeVisible();
        }
    }

    async verifySuccessMessage(text) {
        await expect(this.successAlert).toContainText(text);
    }
}
