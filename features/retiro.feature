# language: es
Característica: Retiro de fondos (API REST)
  Como cliente del banco
  Quiero retirar fondos de una de mis cuentas
  Para disponer de mi dinero

  # NOTA (supuesto documentado): en la UI de ParaBank la opción "Withdraw Funds"
  # existe únicamente como servicio ATM expuesto por API (WSDL/REST), no como
  # página web. Por ello el retiro se implementa contra la API REST oficial:
  # POST /parabank/services/bank/withdraw. Ver README, sección "Supuestos".

  Antecedentes:
    Dado que soy un cliente registrado con una cuenta nueva de 100 dólares

  Escenario: Retiro exitoso con saldo suficiente
    Cuando realizo por API un retiro de 60 dólares de mi cuenta nueva
    Entonces la API confirma el retiro exitoso
    Y el saldo de la cuenta consultado por API es de 40 dólares

  Escenario: Retiro rechazado sobre una cuenta inexistente
    Cuando realizo por API un retiro de 10 dólares de la cuenta inexistente "99999999"
    Entonces la API rechaza la operación de retiro
