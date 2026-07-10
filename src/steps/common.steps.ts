import {expect} from '@playwright/test';
import {Given} from './fixtures';
import {generateUser} from '../utils/dataGenerator';

//esta sera la condicion compartida para tomar el usuario registrado y cerrar sesion.

Given('que existe un usuario registrado en el sistema', async({registerPage,ctx})=>{
    const user = generateUser();
    await registerPage.open();
    await registerPage.register(user);
    await expect(registerPage.successMessage).toBeVisible();
    ctx.user = user;
    await registerPage.logout();
});
