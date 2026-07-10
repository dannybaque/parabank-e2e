import { expect } from '@playwright/test';
import { When, Then } from './fixtures';

When(
  'transfiero {float} dólares desde mi cuenta principal hacia mi cuenta nueva',
  async ({ transferPage, ctx }, amount: number) => {
    await transferPage.open();
    await transferPage.transfer(amount.toFixed(2), ctx.primaryAccountId!, ctx.newAccountId!);
  },
);


Then(
  'veo la confirmación de transferencia completada por {float} dólares',
  async ({ transferPage }, amount: number) => {
    await expect(transferPage.successTitle).toBeVisible();
    await expect(transferPage.amountResult).toHaveText(`$${amount.toFixed(2)}`);
  },
);

Then('el resumen de cuentas muestra ambas cuentas', async ({ overviewPage, ctx }) => {
  await overviewPage.open();
  const accountIds = await overviewPage.getAccountIds();
  expect(accountIds).toContain(ctx.primaryAccountId!);
  expect(accountIds).toContain(ctx.newAccountId!);
});

