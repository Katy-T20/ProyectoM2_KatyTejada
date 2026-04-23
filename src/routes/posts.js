import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostByAuthor, getPostById, updatePost } from "../controllers/postsControllers.js";

const router = Router();

router.get('/', getAllPosts);

// ✅ Ruta estática ANTES que la dinámica
router.get('/authors/:authorId', getPostByAuthor);

router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);



export default router;