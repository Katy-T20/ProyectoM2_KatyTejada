import express from "express";
import router from "./routes/index.js";
import { errorHandler } from "./Middlewares/ErrorHandler.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Swagger ✅ ANTES del 404
const swaggerDocument = YAML.load(path.join(__dirname, "../openapi.yaml"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'Blog API', endpoints: { authors: '/api/authors', posts: '/api/posts' }});
});

app.use("/api", router);

// 404 ✅ SIEMPRE al final
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

export default app;