import express from "express";
import router from "./routes/index.js";
import { errorHandler } from "./Middlewares/ErrorHandler.js"

const app = express();
app.use(express.json());
app.use("/api",router);

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

// Manejo de rutas no encontradas 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use(errorHandler);

export default app;