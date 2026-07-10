import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';
import { generateUser } from '../utils/dataGenerator';

// Dado que estoy en la página de registro
Given('que estoy en la página de registro', async ({ registerPage }) => {
  await registerPage.open();
});

// Cuando completo el formulario con datos válidos y únicos
When('completo el formulario con datos válidos y únicos', async ({ registerPage, ctx }) => {
  const user = generateUser();
  ctx.user = user;
  await registerPage.register(user);
});

// Cuando intento registrarme con el mismo nombre de usuario
When('intento registrarme con el mismo nombre de usuario', async ({ registerPage, ctx }) => {
  const dup = { ...generateUser(), username: ctx.user!.username };
  await registerPage.register(dup);
});

// Entonces veo la confirmación de registro exitoso
Then('veo la confirmación de registro exitoso', async ({ registerPage }) => {
  await expect(registerPage.successMessage).toBeVisible();
});

// Entonces veo el mensaje de que el usuario ya existe
Then('veo el mensaje de que el usuario ya existe', async ({ registerPage }) => {
  await expect(registerPage.usernameExistError).toBeVisible();
});