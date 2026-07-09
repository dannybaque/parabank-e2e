import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
/**
 * Configuración BDD: los archivos .feature (Gherkin en español) se transforman
 * en specs de Playwright mediante `bddgen` antes de la ejecución.
 */

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'src/steps/**/*.ts',
});

export default defineConfig({
  testDir,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  /* ParaBank es un demo público: 1 worker y 1 retry para máxima estabilidad. */
  workers: 1,
  retries: 1,
  fullyParallel: false,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: 'https://parabank.parasoft.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});