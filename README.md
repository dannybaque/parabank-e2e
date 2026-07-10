# ParaBank E2E — Suite de Automatización de Pruebas

Solución al reto técnico de Calidad de Software (Analista QA Automation). 
Automatiza los flujos solicitados sobre el portal bancario de demostración [ParaBank](https://parabank.parasoft.com/parabank/index.htm): 

**registro, inicio de sesión, retiro y transferencia entre cuentas**.

## Stack tecnológico

| Herramienta | Versión | Rol |
|---|---|---|
| Node.js | 20.20.2 | Runtime |
| Playwright (`@playwright/test`) | 1.61.1 | Motor de automatización UI + API |
| playwright-bdd | 9.2.0 | Ejecución de escenarios Gherkin sobre Playwright |
| TypeScript | 5.9 | Lenguaje, tipado estricto |
| @types/node | 26.1.1 | Tipos de Node para TypeScript |

## Supuestos y decisiones de diseño

1. **"API" vs. portal web.** La consigna indica "considere como SUT la API" pero el enlace corresponde al portal web. Se interpretó como una prueba **híbrida**: los flujos con interfaz web (registro, login, transferencia) se automatizan por **UI**, y el retiro se automatiza por **API REST**.

2. **El retiro no existe como página web.** En ParaBank, "Withdraw Funds" figura únicamente como servicio ATM expuesto por API (WSDL/REST), no como página navegable. Por ello el retiro se implementa contra la API REST oficial (`POST /parabank/services/bank/withdraw`), verificando además el saldo con `GET /parabank/services/bank/accounts/{id}`.

3. **Datos de prueba dinámicos.** ParaBank es un entorno público compartido cuya base de datos se reinicia periódicamente. Cada escenario **crea su propio usuario** con datos únicos (timestamp + componente aleatorio), garantizando independencia y repetibilidad sin datos precargados.

4. **Saldo determinista para el retiro.** Al abrir una cuenta nueva, ParaBank deposita $100 fijos desde la cuenta principal. El retiro se ejecuta sobre esa cuenta, permitiendo afirmar el saldo con exactitud ($100 − $60 = $40).

5. **Ejecución secuencial (1 worker) con 1 reintento.** Decisión deliberada de estabilidad frente a un SUT de demostración compartido.

## Defecto observado en el SUT

Durante la automatización se identificó un comportamiento defectuoso de ParaBank en transferencia:

> Al enviar una transferencia con el campo de monto vacío (con cuentas de origen y destino válidas y distintas), ParaBank responde con un **error interno del servidor** ("An internal error has occurred and has been logged.") en lugar de una **validación de formulario**. El comportamiento se reprodujo de forma automatizada y manual.

En un entorno real se reportaría como defecto. Para la suite se optó por no automatizar este caso negativo, dado que el SUT no lo maneja de forma predecible, y se documenta el hallazgo. El flujo de transferencia conserva su caso positivo con verificación completa.

## Arquitectura

Patrón **Page Object Model (POM)** con clase base, capa de steps BDD delgada y un cliente de API dedicado, con inyección de dependencias mediante *fixtures* de Playwright:

​```
features/                  # Casos de prueba en Gherkin (español)
src/
  pages/                   # Page Objects (selectores y acciones de UI)
    BasePage.ts
    RegisterPage.ts
    LoginPage.ts
    AccountsOverviewPage.ts
    OpenAccountPage.ts
    TransferFundsPage.ts
  api/
    BankApiClient.ts       # Cliente REST (retiro y consulta de saldo)
  steps/
    fixtures.ts            # Inyección de POMs, cliente API y contexto
    common.steps.ts        # Precondiciones compartidas
    *.steps.ts             # Steps por funcionalidad
  utils/
    dataGenerator.ts       # Generación de datos únicos por corrida
.github/workflows/
  e2e-tests.yml            # Pipeline CI con publicación de reportes
playwright.config.ts       # Configuración: BDD, reportería, timeouts
​```

Principios: separación de responsabilidades por capas, steps sin lógica de UI (solo orquestan Page Objects y aserciones), selectores centralizados, estado de escenario tipado (`ScenarioContext`) compartido vía fixture, y tipado estricto de TypeScript.

## Cobertura de casos

| Funcionalidad | Escenario | Tipo |
|---|---|---|
| Login | Credenciales válidas acceden al resumen de cuentas | Positivo · UI |
| Login | Credenciales inválidas muestran error | Negativo · UI |
| Login | Campos vacíos muestran validación | Negativo · UI |
| Retiro | Retiro exitoso con verificación de saldo | Positivo · API |
| Retiro | Cuenta inexistente es rechazada | Negativo · API |
| Transferencia | Transferencia exitosa entre dos cuentas propias | Positivo · UI |

Técnicas aplicadas: partición de equivalencias (credenciales válidas/inválidas, cuenta existente/inexistente) y verificación de precondiciones.

## Requisitos previos

- **Node.js 20.20.2** (o LTS ≥ 20) — https://nodejs.org
- npm 10+ (incluido con Node)
- Conexión a internet (el SUT es público)

## Instalación paso a paso

​```bash
# 1. Clonar el repositorio (o descomprimir el .zip)
git clone <url-del-repositorio>
cd parabank-e2e

# 2. Instalar dependencias
npm install

# 3. Instalar el navegador de Playwright
npx playwright install chromium
​```

## Ejecución

​```bash
# Suite completa (genera specs desde los .feature y corre los tests)
npm test

# Abrir el reporte HTML
npm run report
​```

## Reportes

- **HTML**: `reports/html/index.html` (interactivo; screenshots/video/trace en fallos)
- **JSON**: `reports/results.json`

## CI/CD

El workflow `.github/workflows/e2e-tests.yml` ejecuta la suite en cada push y PR a `main`, publicando los reportes como artefactos.

## Nota sobre el SUT

ParaBank es un entorno público de demostración: puede presentar intermitencia, límites de peticiones o reinicios de datos. La suite lo tolera (datos autogenerados, reintento configurado), pero ante caída o saturación temporal del sitio los tests podrían fallar por indisponibilidad del SUT, no por defectos de la automatización. En ese caso, reintentar cuando el sitio se restablezca.