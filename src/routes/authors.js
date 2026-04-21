import { Router } from "express";
import pool from "../db/config.js";
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorsById, updateAuthor } from "../controllers/authorsControllers.js";

const router = Router();


// GET /api/authors
router.get("/", getAllAuthors)

// GET /api/authors/:id
router.get("/:id", getAuthorsById)

// POST /api/authors
router.post("/", createAuthor)

// PUT /api/authors/:id
router.put("/:id", updateAuthor)

// DELETE /api/authors/:id - Eliminar un autor
router.delete("/:id", deleteAuthor)

export default router;