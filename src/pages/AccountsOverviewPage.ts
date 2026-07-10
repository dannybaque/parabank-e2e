import {Page, Locator} from '@playwright/test';
import {BasePage} from '../pages/BasePage';

export class AccountsOverviewPage extends BasePage {
    readonly accountsTable: Locator;
    readonly accountLinks: Locator;

    constructor (page:Page){
        super(page);
        this.accountsTable = page.locator('#accountTable');
        this.accountLinks = page.locator('#accountTable tbody tr td a'); 
    }

    async open(): Promise<void>{
        await this.goto('/parabank/overview.htm');
    }

    async getFirstAccountId(): Promise<string>{
        await this.accountLinks.first().waitFor();
        //vamos a traer la cuenta inicial de cliente cuando se registro
        return (await this.accountLinks.first().innerText()).trim();
    }

    async getAccountIds(): Promise<string[]>{
        await this.accountLinks.first().waitFor();
        const ids = await this.accountLinks.allInnerTexts();
        return ids.map((id) => id.trim());
    }
}
