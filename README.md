# Hola 👋 Bienvenidos a mi Challenge Técnico

_Espero que los disfruten :)_

## Índice

1. [Comenzando 🚀](#comenzando)
2. [Pre-requisitos 📋](#pre-requisitos)
3. [Instalación 🔧](#instalación)
4. [Uso y Características 📝](#uso-y-características)
5. [Construido con 🛠️](#construido-con)
6. [Autores ✒️](#autores)
7. [Licencia 📄](#licencia)

## Comenzando 🚀

_Espero que disfruten explorando mi Challenge Técnico._


### Pre-requisitos 📋

_Antes de comenzar, asegúrate de tener lo siguiente instalado:_

- [Node.js](https://nodejs.org/) - Entorno de ejecución de JavaScript
- [npm](https://www.npmjs.com/) - Administrador de paquetes de Node.js
- [Docker](https://www.docker.com/) - Plataforma de contenedores

### Instalación 🔧

_Sigue estos pasos para instalar y configurar el proyecto localmente:_

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd tu-repositorio
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Configura las variables de entorno:
    - En la carpeta `backend`, ya debería existir un archivo `variables.env` con la configuración de la base de datos.
    - Si necesitas modificar la configuración, edita el archivo `variables.env` en la raíz del directorio `backend`:
        ```plaintext
        DB_MONGO=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/tu-base-de-datos
        ```

### Levantar Docker 🐳

_Sigue estos pasos para levantar los contenedores Docker:_

1. Construye las imágenes Docker:
    ```bash
    docker-compose build
    ```
2. Inicia los contenedores:
    ```bash
    docker-compose up
    ```
3. La aplicación backend debería estar corriendo en `http://localhost:4000` y el frontend en `http://localhost:4200`.


## Uso y Características 📝

_Descripción y características del proyecto:_

- **Autenticación de usuarios**: Permite a los usuarios registrarse e iniciar sesión.
- **Gestión de productos**: CRUD (Crear, Leer, Actualizar, Eliminar) de productos.

### Rutas de la API

1. **Usuarios:**
    - `POST /signup`: Registra un nuevo usuario.
    - `POST /login`: Inicia sesión.
    - `POST /logout`: Cierra sesión.

2. **Productos:**
    - `GET /productos`: Obtiene todos los productos.
    - `POST /productos`: Crea un nuevo producto.
    - `PUT /productos/:id`: Actualiza un producto.
    - `DELETE /productos/:id`: Elimina un producto.

## Construido con 🛠️

_Las herramientas que utilicé para crear el proyecto:_

- [Angular Material](https://material.angular.io/) - Componentes de Material Design para Angular.
- [Angular Material Icons](https://google.github.io/material-design-icons/) - Iconos de Material Design para Angular.
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - Framework CSS.
- [Animate Greensock](https://greensock.com/) - Librería JS para los efectos.
- [Express](https://expressjs.com/) - Framework para Node.js.
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Base de datos en la nube.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Librería para encriptar contraseñas.
- [SweetAlert2](https://sweetalert2.github.io/) - Librería para mostrar alertas.
- [Jest](https://jestjs.io/) - Framework de testing para JavaScript.
- [Supertest](https://github.com/visionmedia/supertest) - Librería para testing de APIs.

## Autores ✒️

- **Martin Enriquez** - _Desarrollador_ - [martinenriquez](https://github.com/martinenriquez)

## Licencia 📄

_Este proyecto está bajo la Licencia ISC. Mira el archivo [LICENSE](LICENSE) para más detalles._

---

_Si tienen alguna pregunta o comentario, no duden en contactarme._
