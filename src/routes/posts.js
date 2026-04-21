import { Router } from "express";
import pool from "../db/config.js";
import { createPost, deletePost, getAllPosts, getPostByAuthor, getPostById, updatePost } from "../controllers/postsControllers.js";

const router = Router();

// GET /api/posts - Obtener todos los posts
router.get('/', getAllPosts)

// GET /api/posts/:id - Obtener un post por ID
router.get('/:id', getPostById)

// GET /api/posts/author/:authorId - Obtener posts por autor
router.get('/author/:authorId', getPostByAuthor)

// POST /api/posts - Crear un nuevo post
router.post('/', createPost)

// PUT /api/posts/:id - Actualizar un post
router.put('/:id', updatePost)

// DELETE /api/posts/:id - Eliminar un post
router.delete('/:id', deletePost)

export default router;