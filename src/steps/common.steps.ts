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

Given(
  'que soy un cliente registrado con una cuenta nueva de {int} dólares',
  async ({ registerPage, overviewPage, openAccountPage, ctx }, initialDeposit: number) => {
    expect(initialDeposit, 'ParaBank abre cuentas nuevas con $100 fijos').toBe(100);

    const user = generateUser();
    await registerPage.open();
    await registerPage.register(user);
    await expect(registerPage.successMessage).toBeVisible();
    ctx.user = user;

    await overviewPage.open();
    ctx.primaryAccountId = await overviewPage.getFirstAccountId();

    await openAccountPage.open();
    ctx.newAccountId = await openAccountPage.openNewAccount('SAVINGS');
    expect(ctx.newAccountId).toMatch(/^\d+$/);
  },
);