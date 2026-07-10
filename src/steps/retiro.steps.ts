import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

When(
  'realizo por API un retiro de {int} dólares de mi cuenta nueva',
  async ({ bankApi, ctx }, amount: number) => {
    ctx.apiResponse = await bankApi.withdraw(ctx.newAccountId!, amount);
  },
);

When(
  'realizo por API un retiro de {int} dólares de la cuenta inexistente {string}',
  async ({ bankApi, ctx }, amount: number, accountId: string) => {
    ctx.apiResponse = await bankApi.withdraw(accountId, amount);
  },
);

Then('la API confirma el retiro exitoso', async ({ ctx }) => {
  expect(ctx.apiResponse!.ok(), 'la respuesta HTTP del retiro debe ser exitosa').toBeTruthy();
  const body = await ctx.apiResponse!.text();
  expect(body).toContain('Successfully withdrew');
});

Then(
  'el saldo de la cuenta consultado por API es de {int} dólares',
  async ({ bankApi, ctx }, expectedBalance: number) => {
    const balance = await bankApi.getBalance(ctx.newAccountId!);
    expect(balance).toBe(expectedBalance);
  },
);

Then('la API rechaza la operación de retiro', async ({ ctx }) => {
  expect(
    ctx.apiResponse!.status(),
    'una cuenta inexistente debe producir un error HTTP',
  ).toBeGreaterThanOrEqual(400);
});
