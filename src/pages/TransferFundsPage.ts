import {Page, Locator} from '@playwright/test';
import {BasePage} from '../pages/BasePage';

export class TransferFundsPage extends BasePage {
    readonly amountInput: Locator;
    readonly fromAccountSelect: Locator;
    readonly toAccountSelect: Locator;
    readonly transferButton: Locator;
    readonly successTitle: Locator;
    readonly amountResult: Locator;
    readonly emptyAmountError: Locator;

    constructor (page: Page){
        super(page);
        this.amountInput = page.locator('#amount');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.toAccountSelect = page.locator('#toAccountId');
        this.transferButton = page.locator('input[value="Transfer"]');
        this.successTitle = page.locator('#rightPanel h1.title', { hasText: 'Transfer Complete!' });
        this.amountResult = page.locator('#amountResult');
        this.emptyAmountError = page.locator('[id="amount.errors"]', {hasText: 'The amount cannot be empty.',});
    }

    async open(): Promise<void> {
        await this.goto('/parabank/transfer.htm');
        // Los combos se cargan por AJAX: esperar a que tengan opciones.
        await this.fromAccountSelect.locator('option').first().waitFor({ state: 'attached' });
    }

    async transfer(amount: string, fromAccountId: string, toAccountId: string): Promise<void> {
        await this.amountInput.fill(amount);
        await this.fromAccountSelect.selectOption(fromAccountId);
        await this.toAccountSelect.selectOption(toAccountId);
        await this.transferButton.click();
    }

    async submitWithoutAmount(fromAccountId: string, toAccountId: string): Promise<void> {
    await this.fromAccountSelect.selectOption(fromAccountId);
    await this.toAccountSelect.selectOption(toAccountId);
    await this.amountInput.fill('');
    await this.transferButton.click();
    }
}