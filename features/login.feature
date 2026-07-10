# language: es
Característica: Inicio de sesión en ParaBank
  Como cliente registrado
  Quiero iniciar sesión en el portal
  Para acceder a mis cuentas y operaciones

  Escenario: Inicio de sesión fallido con credenciales inválidas
    Dado que estoy en la página de inicio de sesión
    Cuando inicio sesión con usuario "usuario_inexistente" y contraseña "clave_incorrecta"
    Entonces veo un mensaje de error de autenticación

  Escenario: Inicio de sesión exitoso con credenciales válidas
    Dado que existe un usuario registrado en el sistema
    Y que estoy en la página de inicio de sesión
    Cuando inicio sesión con mis credenciales válidas
    Entonces veo el resumen de mis cuentas

  Escenario: Inicio de sesión fallido con campos vacíos
    Dado que estoy en la página de inicio de sesión
    Cuando envío el formulario de inicio de sesión sin completar los campos
    Entonces veo el error que solicita ingresar usuario y contraseña