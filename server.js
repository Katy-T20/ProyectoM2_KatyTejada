import "dotenv/config";
import pool from "./src/db/config.js";
import app from "./src/app.js";

// ✅ Sin __dirname, sin YAML, sin Swagger aquí
const PORT = process.env.PORT || 3000;

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