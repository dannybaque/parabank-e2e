import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class LoginPage extends BasePage{
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly accountsOverviewTitle: Locator;
    
    constructor(page: Page){
        super(page);
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');
        this.errorMessage = page.locator('#rightPanel .error');
        this.accountsOverviewTitle = page.getByRole('heading', { name: 'Accounts Overview' });
    }

    async open(): Promise<void>{
        await this.goto('/parabank/index.htm');
    }

    async login(username:string,password:string): Promise<void>{
        if(username) await this.usernameInput.fill(username);
        if(password) await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async submitEmpty(): Promise<void>{
        await this.loginButton.click();
    }
}