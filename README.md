*API REST
API REST construida con Node.js, Express y PostgreSQL para gestionar autores y posts.
La APPI incluye validaciones, controladores, middlewares, manejo de errores y tests automatizados con Vitest + Supertest. Esta API permite:CRUD (Crear, leer, actualizar y borrar) de autores y posts, validar datos antes de insertarlos y manejar errores de PostgreSQL (duplicados, campos faltantes, relaciones).

**URL de API

**TECNOLOGIA
- Express
- Node.js
- Postgres
- Vitest
- Supertest
- Dotenv

**ESTRUCTURA DEL PROYECTO
ProyectoM2/
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── .gitignore
├── README.md
├── vitest.config.js
├── src/
│   ├── app.js
│   ├── db/
│   │   ├── config.js
│   │   ├── setup.sql
│   │   └── test-connection.js
│   ├── controllers/
│   │   ├── authorsControllers.js
│   │   └── postsControllers.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── authors.js
│   │   └── posts.js
│   ├── utils/
│   │   ├── authorsValidators.js
│   │   └── postsValidators.js
│   └── Middlewares/
│       └── ErrorHandler.js
└── Tests/
    ├── authors.test.js
    ├── posts.test.js
    ├── authorsValidators.test.js
    └── postsValidators.test.js

**VALIDACIONES
***Authors
Authors
name, email, bio
***Posts
title, content, author_id, published

** USO DE IA
La IA fue de gran ayuda en el desarrollo de este proyecto integrador, aunque el proyecto fue desafiante me guie con copilot para resolver errores que surgieron en el desarrollo. La siguiente lista muestra puntos/promts usados para r continuación se describen los casos más relevantes.

1. Estructura para Server.js
Ubo un problema cuando quise correr el servidor y la IA sugirio derjar el archivo server.js en la raiz y integrar todos las demas carpetas y archivos en una carpeta "src", me ayudo a cambiar los scripts correctamente en "package.json" y soluciono el problema del servidor.

2. Migración de CommonJS a ES Modules
La IA identifico los cambios necesarios para ejecutar los cambios en el codigo de commonJS a ESM(Module). Devido a que commonJS trabaja con el comando "require" fue necesario hacer modificaciones en el codigo para remplacer "require" a "import/export" que es lo q ESM utiliza y la IA identidico los archivos para cambiar solucionando el problema.

4. Tests fallidos por datos inexistentes en la DB
Inconsistencias de syntax en "authors.test.js"/authorsValidators.test.js/authorsControllers ocacionaron muchos errores al hacer los test y la IA ayudo en gran parte a solucionar muchos de ellos.
