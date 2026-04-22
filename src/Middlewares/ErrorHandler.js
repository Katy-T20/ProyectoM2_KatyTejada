export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Error interno del servidor";

    console.error("Error no manejado:", err);
    console.error("Error capturado:", {
        status: statusCode,
        message,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString(),
    });

    // Errores de PostgreSQL
    if (err.code) {
        if (err.code === "23505") {
            return res.status(409).json({ error: "Registro duplicado" });
        }
        if (err.code === "23503") {
            return res.status(409).json({ error: "Violación de relación entre tablas" });
        }
        if (err.code === "23502") {
            return res.status(400).json({ error: "Campo requerido faltante" });
        }
    }

    // RESPETAR status y mensaje personalizados
    return res.status(statusCode).json({ error: message });
  }