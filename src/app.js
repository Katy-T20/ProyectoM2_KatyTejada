import express from "express";
import router from "./routes/index.js";
import { errorHandler } from "./Middlewares/ErrorHandler.js";

const app = express();
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Blog API',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts'
    }
  });
});

app.use("/api", router);

// Manejo de rutas no encontradas 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// error handler
app.use(errorHandler);

// Swagger UI
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar openapi.yaml desde la raíz del proyecto
const swaggerDocument = YAML.load(
  path.join(__dirname, "../openapi.yaml")
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;