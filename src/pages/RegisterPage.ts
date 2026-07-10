import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';
import {UserData} from '../utils/dataGenerator';

export class RegisterPage extends BasePage{
    readonly successMessage: Locator;
    readonly usernameExistError: Locator;

    constructor(page: Page){
        super(page);
        this.successMessage = page.locator('#rightPanel p',{
            hasText: 'Your account was created successfully',
        });
        this.usernameExistError = page.locator('[id="customer.username.errors"]');

    }

    async open(): Promise<void>{
        await this.goto('/parabank/register.htm');
    }

    private field(name: string): Locator{
        //uso este selector como apoyo ya que se repiten en todos los ids del formulario
        return this.page.locator(`[id="customer.${name}"]`);
    }

    async register(user: UserData): Promise<void>{
        await this.field('firstName').fill(user.firstName);
        await this.field('lastName').fill(user.lastName);
        await this.field('address.street').fill(user.address);
        await this.field('address.city').fill(user.city);
        await this.field('address.state').fill(user.state);
        await this.field('address.zipCode').fill(user.zipCode);
        await this.field('phoneNumber').fill(user.phone);
        await this.field('ssn').fill(user.ssn);
        await this.field('username').fill(user.username);
        await this.field('password').fill(user.password);
        await this.page.locator('#repeatedPassword').fill(user.password);
        await this.page.locator('input[value="Register"]').click();
    }
}