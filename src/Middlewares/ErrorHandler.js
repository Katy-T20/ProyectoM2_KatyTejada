export function errorHandler(err, req, res, next) {
  console.error("Error no manejado:", err);

  // Error de PostgreSQL
  if (err.code) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Registro duplicado' });
    }
    if (err.code === '23503') {
      return res.status(409).json({ error: 'Violación de relación entre tablas' });
    }
    if (err.code === '23502') {
      return res.status(400).json({ error: 'Campo requerido faltante' });
    }
  }
  
  res.status(500).json({ error: "Error interno del servidor" });
}
