import "dotenv/config";
import express from "express";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import pool from "./db/config.js"; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

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

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

pool.query("SELECT NOW()")
  .then(res => {
    console.log("✅ Conexión exitosa:", res.rows[0]);
  })
  .catch(err => {
    console.error("❌ Error de conexión:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});