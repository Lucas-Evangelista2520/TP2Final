# Proyecto Final TP2 - Backend API

Este proyecto implementa una API RESTful para la gestión de productos, incluyendo autenticación JWT y una funcionalidad para consumir y guardar datos CSV de una API externa.

## Configuración del Proyecto

### 1. Instalación de Dependencias

Asegúrate de tener [Node.js](https://nodejs.org/es/) y [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) instalados. Luego, instala las dependencias del proyecto:

```
npm install
```

### 2. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que `package.json`). Este archivo debe contener las siguientes variables:

```
MONGO_URI="mongodb+srv://<user>:<password>@<cluster_url>/<database_name>?retryWrites=true&w=majority"
JWT_SECRET="TU_CLAVE_SECRETA_MUY_LARGA_Y_COMPLEJA_PARA_JWT"
SERVER_PORT=3004
SERVER_HOST=127.0.0.1
```

*   **`MONGO_URI`**: La cadena de conexión a tu base de datos MongoDB. Si usas MongoDB Atlas, asegúrate de que tu dirección IP esté en la lista blanca de IP de tu cluster.(ya puse el 0.0.0.0/0)
*   **`JWT_SECRET`**: Una cadena larga y aleatoria para firmar y verificar tus tokens JWT. ¡No la compartas!
*   **`SERVER_PORT`**: El puerto en el que correrá el servidor (por defecto: 3004).
*   **`SERVER_HOST`**: El host en el que correrá el servidor (por defecto: 127.0.0.1).

### 3. Base de Datos MongoDB

Este proyecto utiliza MongoDB con Mongoose. Asegúrate de tener una instancia de MongoDB accesible y de que tu `MONGO_URI` esté configurada correctamente.


## Ejecución del Servidor

Para iniciar el servidor de desarrollo:

```bash
npm start
```

Si la conexión a MongoDB es exitosa y el servidor se inicia correctamente, verás mensajes en la consola indicando que "Mongoose connected" y "Servidor corriendo en..."

## Estructura del Proyecto

El proyecto sigue una arquitectura en capas:

*   **`src/models`**: Define los esquemas y modelos de Mongoose para la interacción con MongoDB (User, Product).
*   **`src/services`**: Contiene la lógica de negocio principal y la interacción con los modelos de la base de datos (AuthService, ProductService, AlbumService).
*   **`src/controllers`**: Maneja la lógica de las solicitudes HTTP, llama a los servicios y formatea las respuestas (AuthController, ProductController, AlbumController).
*   **`src/routes`**: Define los endpoints de la API y los asocia a los métodos de los controladores (auth.routes.js, product.routes.js, album.routes.js).
*   **`src/middlewares`**: Contiene middlewares de Express, como el de autenticación JWT (auth.middleware.js).
*   **`src/config`**: Gestiona la configuración de la aplicación, incluyendo las variables de entorno.
*   **`src/utils`**: Contiene utilidades auxiliares, como la conversión de JSON a CSV (csv.utils.js).
*   **`src/localdata`**: Carpeta para almacenar archivos generados localmente, como `albums_15.csv`.
*   **`test`**: Contiene archivos `.http` para probar los endpoints de la API.

## Endpoints de la API y Cómo Probarlos

Se proporcionan dos archivos `.http` en la carpeta `test/` para probar la API: `products.http` y `albums.http`.

### `test/products.http` (Endpoints de Autenticación y Productos)

Este archivo contiene solicitudes para:

*   **Autenticación (`/api/auth/`)**: Registrar usuarios y obtener tokens JWT.
*   **CRUD de Productos (`/api/v1/productos/`)**: Operaciones para crear, listar, obtener por ID, actualizar y eliminar productos.

**Para probar los endpoints que requieren autenticación:**

1.  **Registra un usuario**: Ejecuta la solicitud `POST {{host}}/api/auth/register` en `test/products.http`.
    *   Puedes probar a registrar un usuario con un email que ya existe para ver el mensaje de error.
2.  **Inicia sesión**: Ejecuta la solicitud `POST {{host}}/api/auth/login` con las credenciales del usuario registrado.
3.  **Copia el JWT**: En la respuesta de la solicitud de login, copia el token JWT completo (la cadena larga sin "Bearer ").
4.  **Establece la variable `@token`**: En la parte superior de `test/products.http`, pega el token copiado en la variable `@token = YOUR_JWT_TOKEN_HERE`.
5.  **Ahora puedes probar las rutas protegidas**: Las rutas `PUT` y `DELETE` para productos requieren este token.
    *   **Crear Producto (POST)**: Puedes crear un producto sin token.
    *   **Listar Productos (GET)**: Puedes listar productos sin token.
    *   **Obtener Producto por ID (GET)**: Puedes obtener un producto por ID sin token.
    *   **Actualizar Producto (PUT)**: Necesitarás el token y el ID de un producto existente. Probar sin token debería dar un error 401.
    *   **Eliminar Producto (DELETE)**: Necesitarás el token y el ID de un producto existente. Probar sin token debería dar un error 401.

    **Importante**: Después de crear un producto, copia su `_id` de la respuesta y reemplaza `YOUR_PRODUCT_ID_HERE` en las solicitudes GET, PUT y DELETE para productos.

### `test/albums.http` (Endpoint de CSV de Álbumes)

Este archivo contiene la solicitud para:

*   **Obtener y Guardar CSV de Álbumes (`/api/v1/albums/csv`)**:

1.  Ejecuta la solicitud `GET {{host}}/api/v1/albums/csv` en `test/albums.http`.
2.  En la respuesta, recibirás el contenido CSV. 
3.  Un archivo `albums_15.csv` se generará y guardará en la carpeta `src/localdata/` de tu proyecto.
