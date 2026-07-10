import {expect} from '@playwright/test';
import {Given, When, Then} from './fixtures';

Given('que estoy en la página de inicio de sesión',async({loginPage}) =>{
    await loginPage.open();
});

When(
    'inicio sesión con usuario {string} y contraseña {string}',
    async ({loginPage},username:string,password:string) =>{
        await loginPage.login(username,password);
    },
);

When('envío el formulario de inicio de sesión sin completar los campos', async ({loginPage}) =>{
    await loginPage.submitEmpty();
});

Then('veo un mensaje de error de autenticación', async ({loginPage}) => {
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('could not be verified');
});

Then('veo el error que solicita ingresar usuario y contraseña', async ({loginPage}) =>{
    await expect(loginPage.errorMessage).toHaveText('Please enter a username and password.');
});