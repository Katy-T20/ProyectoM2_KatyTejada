# ProyectoM2_KatyTejada - API REST de Blog

**Swagger UI en Railway:** `https://proyectom2katytejada-production.up.railway.app/api-docs`

## 📋 Descripción del Proyecto

API REST desarrollada con **Express.js** y **PostgreSQL** para gestionar un blog con autores y posts. Incluye validación de datos, manejo de errores, documentación OpenAPI/Swagger y deployment en Railway.

**Características principales:**
- ✅ Gestión completa de autores (CRUD (Crear, leer, actualizar y borrar))
- ✅ Gestión de posts asociados a autores
- ✅ Validación de datos con esquemas personalizados
- ✅ Documentación interactiva con Swagger UI
- ✅ Tests automatizados con Vitest
- ✅ Middleware de manejo de errores centralizado
- ✅ Base de datos PostgreSQL con relaciones

---

## 🛠️ Requisitos

- **Node.js** v18.x o superior
- **npm**
- **PostgreSQL** v12 o superior (local o remoto)

---

## 📦 Instalación y Configuración Local

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd ProyectoM2_KatyTejada
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/blog_db

# Puerto del servidor
PORT=3000

# Entorno
NODE_ENV=development
```

### 4. Crear la base de datos y ejecutar setup SQL

```bash
# Crear la base de datos (desde psql o tu cliente)
createdb proyectom2

# Ejecutar el script SQL para crear tablas e insertar datos de ejemplo
psql -U postgres -d proyectom2 -f src/db/setup.sql
```

O si prefieres ejecutarlo desde Node.js:
```bash
node src/db/test-connection.js
```

---

## 🚀 Ejecución Local

### Modo desarrollo (con recarga automática)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

---

## 🧪 Ejecución de Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests con interfaz visual
```bash
npm run test:ui
```

### Ejecutar tests con cobertura
```bash
npm run test:coverage
```

**Tests incluidos:**
- `Tests/authorsValidators.test.js` - Validación de datos de autores
- `Tests/postsValidators.test.js` - Validación de datos de posts
- `Tests/authors.test.js` - Endpoints de autores
- `Tests/posts.test.js` - Endpoints de posts

---

## 📚 Documentación OpenAPI/Swagger UI

### Acceso local
Una vez que el servidor esté ejecutándose:
```
http://localhost:3000/api-docs
```

### Acceso en producción (Railway)
```
https://proyectom2katytejada-production.up.railway.app/api-docs
```

### Características
- Visualización interactiva de todos los endpoints
- Posibilidad de probar requests directamente desde la UI
- Información detallada de parámetros, respuestas y esquemas

El archivo OpenAPI está definido en `openapi.yaml`

---

## 🚂 Deployment en Railway

### 1. Preparar el proyecto para Railway

Asegurar que `package.json` tenga los scripts correctos (ya están configurados):
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "vitest"
  }
}
```

### 2. Variables de Entorno en Railway

En el dashboard de Railway, configurar las siguientes variables:

```env
# Base de datos PostgreSQL (Railway lo configura automáticamente)
DATABASE_URL=postgresql://user:password@containers.railway.app:5432/railway

# Puerto (Railway automáticamente asigna uno)
PORT=3000

# Entorno
NODE_ENV=production
```

### 3. URLs importantes

- **URL Pública (desde el navegador):** `https://proyectom2katytejada-production.up.railway.app`
- **URL Interna (entre contenedores Railway):** `http://localhost:3000`
- **Swagger UI en Railway:** `https://proyectom2katytejada-production.up.railway.app/api-docs`
- **API Base:** `https://proyectom2katytejada-production.up.railway.app/api`

**Endpoints principales:**
- GET `/api/authors` - Obtener todos los autores
- POST `/api/authors` - Crear nuevo autor
- GET `/api/authors/:id` - Obtener autor por ID
- PUT `/api/authors/:id` - Actualizar autor
- DELETE `/api/authors/:id` - Eliminar autor
- GET `/api/posts` - Obtener todos los posts
- POST `/api/posts` - Crear nuevo post
- GET `/api/posts/:id` - Obtener post por ID
- PUT `/api/posts/:id` - Actualizar post
- DELETE `/api/posts/:id` - Eliminar post

### 4. Pasos para desplegar en Railway

1. Conectar repositorio de GitHub a [Railway](https://railway.app)
2. Railway detectará automáticamente `package.json`
3. Crear una base de datos PostgreSQL desde Railway Dashboard
4. Configurar variables de entorno con `DATABASE_URL` y otros valores
5. Railway ejecutará automáticamente `npm install` y `npm start`
6. Una vez desplegado, acceder a la URL pública

### 5. Ejecutar setup SQL en producción

Para crear las tablas en la base de datos de Railway:

```bash
# Opción 1: Usar Railway CLI
railway run psql $DATABASE_URL -f src/db/setup.sql

# Opción 2: Acceder a la terminal remota de Railway
# (desde el dashboard) y ejecutar:
psql $DATABASE_URL -f src/db/setup.sql
```

---

## 📊 Validaciones de Datos

### Authors
- `name` (string, requerido): Nombre del autor (máx 100 caracteres)
- `email` (string, requerido): Email único del autor
- `bio` (string, opcional): Biografía del autor

### Posts
- `title` (string, requerido): Título del post (máx 200 caracteres)
- `content` (string, requerido): Contenido del post
- `author_id` (number, requerido): ID del autor asociado
- `published` (boolean, opcional): Estado de publicación (default: false)

---

## 📂 Estructura del Proyecto

```
ProyectoM2_KatyTejada/
├── src/
│   ├── app.js                      # Configuración principal de Express
│   ├── controllers/
│   │   ├── authorsControllers.js   # Lógica de autores
│   │   └── postsControllers.js     # Lógica de posts
│   ├── routes/
│   │   ├── authors.js              # Rutas de autores
│   │   ├── posts.js                # Rutas de posts
│   │   └── index.js                # Índice de rutas
│   ├── db/
│   │   ├── config.js               # Configuración de Pool (PostgreSQL)
│   │   ├── setup.sql               # Script para crear tablas
│   │   └── test-connection.js      # Test de conexión a BD
│   ├── Middlewares/
│   │   └── ErrorHandler.js         # Middleware centralizado de errores
│   └── utils/
│       ├── authorsValidators.js    # Validadores de autores
│       └── postsValidators.js      # Validadores de posts
├── Tests/
│   ├── authors.test.js             # Tests de endpoints de autores
│   ├── posts.test.js               # Tests de endpoints de posts
│   ├── authorsValidators.test.js   # Tests de validadores de autores
│   └── postsValidators.test.js     # Tests de validadores de posts
├── server.js                       # Punto de entrada principal
├── package.json                    # Dependencias y scripts
├── vitest.config.js                # Configuración de tests
├── openapi.yaml                    # Documentación OpenAPI/Swagger
└── README.md                       # Este archivo
```

---

## 🤖 Registro del Uso de AI

La IA fue de gran ayuda en el desarrollo de este proyecto integrador, aunque el proyecto fue desafiante me guie con copilot y clause para resolver errores que surgieron en el desarrollo

### Promts de uso de IA:

1. **Estructura y organización del proyecto**
- Definición de la arquitectura de carpetas separando `server.js` (raíz) y `src/app.js`
- Organización de módulos con separación de responsabilidades: controllers, routes, utils, middlewares
- Configuración de ES Modules (ESM) usando `"type": "module"` en `package.json`

**🐛 Error resuelto:** `server.js` usaba `__dirname` antes de definirlo con `fileURLToPath`, 
lo que causaba un crash al iniciar. Se eliminó el bloque duplicado de Swagger en `server.js` 
y se centralizó en `app.js`.

2. **Controladores y rutas**
- Implementación de controladores CRUD para autores y posts
- Definición de rutas con Express bajo el prefijo `/api`
- Manejo de parámetros y respuestas HTTP

3. **Validación de datos**
- Creación de esquemas y funciones validadoras en `utils/`
- Manejo de errores de validación
- Integración con controladores

4. **Tests automatizados**
- Configuración de Vitest como framework de testing
- Solución de errores de sintaxis en archivos de test
- Conexión correcta entre carpetas y archivos del proyecto

5. **Documentación OpenAPI/Swagger**
- Definición de esquemas OpenAPI en `openapi.yaml`
- Documentación de endpoints para autores y posts
- Configuración de Swagger UI en Express

**🐛 Error resuelto:** El middleware 404 estaba declarado antes que la ruta `/api-docs`, 
interceptando todas las peticiones a Swagger. Se reordenó `app.js` para que Swagger 
se registre antes del manejador de rutas no encontradas.

**🐛 Error resuelto:** `YAML.load()` estaba anidado dentro de otro `YAML.load()`, 
causando `ERR_INVALID_ARG_TYPE`. Se corrigió para cargar el archivo con la ruta 
correcta: `path.join(__dirname, "../openapi.yaml")`.

---

## 👤 Autor

Proyecto desarrollado por **Katy Tejada**