import {Page, Locator} from '@playwright/test';

/*
 Clase base del patrón Page Object Model.
 Centraliza el acceso a Page y elementos transversales del layout de ParaBank.
 */

export abstract class BasePage {
    readonly panelTitle: Locator;
    readonly logoutLink: Locator;

    constructor(protected readonly page: Page) {
        this.panelTitle = page.locator('#rightPanel h1.title');
        this.logoutLink = page.getByRole('link',{name: 'Log Out'});
    }
    async goto(path:string):Promise<void>{
        await this.page.goto(path);
    }

    async logout(): Promise<void> {
        await this.logoutLink.click();
    }
}