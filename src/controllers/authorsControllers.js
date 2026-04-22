import pool from "../db/config.js";
import { validarEmail, validarNombre, validarBio } from "../utils/authorsValidators.js";

// GET /api/authors
export const getAllAuthors = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo autores:", error);
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

// GET /api/authors/:id
export const getAuthorById = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM authors WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error obteniendo autor:", error);
    res.status(500).json({ error: "Error obteniendo autor" });
  }
};

// POST /api/authors
export const createAuthor = async (req, res, next) => {
  const { name, email, bio } = req.body;

  // VALIDACIONES
  const errorNombre = validarNombre(name);
  if (errorNombre) return res.status(400).json({ error: errorNombre });

  const errorEmail = validarEmail(email);
  if (errorEmail) return res.status(400).json({ error: errorEmail });

  const errorBio = validarBio(bio);
  if (errorBio) return res.status(400).json({ error: errorBio });

  try {
    const result = await pool.query(
      "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bio || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creando autor:", error);

    if (error.code === "23505") {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    res.status(500).json({ error: "Error creando autor" });
  }
};

// PUT /api/authors/:id
export const updateAuthor = async (req, res, next) => {
  const { name, email, bio } = req.body;

  // VALIDACIONES
  if (name !== undefined) {
    const errorNombre = validarNombre(name);
    if (errorNombre) return res.status(400).json({ error: errorNombre });
  }

  if (email !== undefined) {
    const errorEmail = validarEmail(email);
    if (errorEmail) return res.status(400).json({ error: errorEmail });
  }

  if (bio !== undefined) {
    const errorBio = validarBio(bio);
    if (errorBio) return res.status(400).json({ error: errorBio });
  }

  try {
    const result = await pool.query(
      "UPDATE authors SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio) WHERE id = $4 RETURNING *",
      [name, email, bio, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error actualizando autor:", error);

    if (error.code === "23505") {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    res.status(500).json({ error: "Error actualizando autor" });
  }
};

// DELETE /api/authors/:id
export const deleteAuthor = async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM authors WHERE id = $1",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json({ message: "Autor eliminado exitosamente" });
  } catch (error) {
    console.error("Error eliminando autor:", error);
    res.status(500).json({ error: "Error eliminando autor" });
  }
};