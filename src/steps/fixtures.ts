import {test as base, createBdd} from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';

interface Fixtures {
    loginPage: LoginPage;
}

export const test = base.extend<Fixtures>({
    loginPage:async ({page},use) =>{
        await use (new LoginPage(page));
    }
});

export const {Given, When, Then} = createBdd(test);