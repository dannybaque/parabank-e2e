import {test as base, createBdd} from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import { UserData } from '../utils/dataGenerator';
import { APIResponse } from '@playwright/test';


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
});

export const {Given, When, Then} = createBdd(test);