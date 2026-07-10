import {test as base, createBdd} from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import { UserData } from '../utils/dataGenerator';
import { APIResponse } from '@playwright/test';
import {AccountsOverviewPage} from '../pages/AccountsOverviewPage';
import {OpenAccountPage} from '../pages/OpenAccountPage';
import {TransferFundsPage} from '../pages/TransferFundsPage';


export interface ScenarioContext{
    user?: UserData;
    primaryAccountId?: string;
    newAccountId?: string;
    apiResponse?: APIResponse;
}

interface Fixtures {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    ctx: ScenarioContext;
    overviewPage: AccountsOverviewPage;
    openAccountPage: OpenAccountPage;
    transferPage: TransferFundsPage;
}

export const test = base.extend<Fixtures>({
    loginPage:async ({page},use) =>{
        await use (new LoginPage(page));
    },
    registerPage:async({page},use) =>{
        await use (new RegisterPage(page));
    },
    ctx:async({}, use)=>{
        await use ({});
    },
      overviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
    },
    openAccountPage: async ({ page }, use) => {
        await use(new OpenAccountPage(page));
    },
    transferPage: async ({ page }, use) => {
        await use(new TransferFundsPage(page));
    },
});

export const {Given, When, Then} = createBdd(test);