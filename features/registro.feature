# language: es
Característica: Registro de usuario en ParaBank
  Como visitante del portal
  Quiero registrarme en el sistema
  Para acceder a los servicios bancarios

  Escenario: Registro exitoso con datos válidos y únicos
    Dado que estoy en la página de registro
    Cuando completo el formulario con datos válidos y únicos
    Entonces veo la confirmación de registro exitoso

  Escenario: Registro rechazado con nombre de usuario existente
    Dado que existe un usuario registrado en el sistema
    Y que estoy en la página de registro
    Cuando intento registrarme con el mismo nombre de usuario
    Entonces veo el mensaje de que el usuario ya existe