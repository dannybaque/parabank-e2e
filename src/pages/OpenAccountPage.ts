import {Page, Locator} from '@playwright/test';
import {BasePage} from '../pages/BasePage';

export type AccountType = 'CHECKING' | 'SAVINGS';

export class OpenAccountPage extends BasePage{
    readonly typeSelect: Locator;
    readonly fromAccountSelect: Locator;
    readonly openButton: Locator;
    readonly newAccountIdLink: Locator;

    constructor (page:Page){
        super(page);
        this.typeSelect = page.locator('#type');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.openButton = page.locator('input[value="Open New Account"]');
        this.newAccountIdLink = page.locator('#newAccountId');
    }

    async open(): Promise<void>{
        await this.goto('/parabank/openaccount.htm');
    }

    async openNewAccount(type: AccountType): Promise<string>{
        await this.fromAccountSelect.locator('option').first().waitFor({ state: 'attached' });
        await this.typeSelect.selectOption({label: type});
        await this.openButton.click();
        await this.newAccountIdLink.waitFor();
        return (await this.newAccountIdLink.innerText()).trim();
    }
}