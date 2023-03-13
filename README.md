# WebServer + RestServer

Ejecutar ```npm install``` para reconstruir los modulos de Node.

REST Server:

- Configuracion del Server
- CRUD
- Base de datos - Coleccion de usuarios
  - Configuracion de MongoDB - MongoAtlas
  - MongoDB Compass - Prueba de conexion
  - Mongoose - Conectar a la base de datos
  - Modelo de usuario
  - BcryptJS - encriptar contraseñas
  - Validacion de campos
- Autenticacion de usuario - JWT
  - JWT
  - Login personalizado (ruta login - Auth/Login)
  - Proteccion de rutas via Token
  - Leer payload del token
- Google SignIn
  - Generacion API Key y API Secret de Google
  - Validacion de tokens usando librerias de Google
  - Google SignIn en el Front
- Categorias y Productos
  - CRUD para Categorias y Productos
  - creacion rutas y modelo de Categoria y Productos
- Carga de Archivos
  - Subir archivos (upload)
  - Actualizar/Cargar/Borrar imagenes de productos/usuarios
  - Cloudinary
- Heroku, Railway