import { APIRequestContext, APIResponse } from '@playwright/test';


export class BankApiClient {
  private readonly baseUrl = '/parabank/services/bank';

  constructor(private readonly request: APIRequestContext) {}

  /** POST /withdraw?accountId=&amount= — debita el monto de la cuenta. */
  async withdraw(accountId: string, amount: number): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/withdraw`, {
      params: { accountId, amount },
      headers: { Accept: 'application/json' },
    });
  }

  /** GET /accounts/{id} — devuelve los datos de la cuenta, incluido el saldo. */
  async getAccount(accountId: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/accounts/${accountId}`, {
      headers: { Accept: 'application/json' },
    });
  }

  async getBalance(accountId: string): Promise<number> {
    const response = await this.getAccount(accountId);
    if (!response.ok()) {
      throw new Error(`No se pudo consultar la cuenta ${accountId}: HTTP ${response.status()}`);
    }
    const body = (await response.json()) as { balance: number };
    return body.balance;
  }
}
