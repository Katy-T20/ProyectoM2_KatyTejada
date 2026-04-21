import { Router } from "express";
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/authorsControllers.js";

const router = Router();


// GET /api/authors
router.get("/", getAllAuthors)

// GET /api/authors/:id
router.get("/:id", getAuthorById)

// POST /api/authors
router.post("/", createAuthor)

// PUT /api/authors/:id
router.put("/:id", updateAuthor)

// DELETE /api/authors/:id - Eliminar un autor
router.delete("/:id", deleteAuthor)

export default router;