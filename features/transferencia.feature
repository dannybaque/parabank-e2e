# language: es
Característica: Transferencia de dinero entre dos cuentas
  Como cliente del banco
  Quiero transferir dinero entre mis cuentas
  Para administrar mis fondos

  Antecedentes:
    Dado que soy un cliente registrado con una cuenta nueva de 100 dólares

  Escenario: Transferencia exitosa entre dos cuentas propias
    Cuando transfiero 25.50 dólares desde mi cuenta principal hacia mi cuenta nueva
    Entonces veo la confirmación de transferencia completada por 25.50 dólares
    Y el resumen de cuentas muestra ambas cuentas

