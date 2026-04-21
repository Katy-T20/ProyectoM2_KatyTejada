import { Router } from "express";
import authorsRouter from "./authors.js";
import postsRouter from "./posts.js";

const router = Router();
router.use("/authors", authorsRouter);
router.use("/posts", postsRouter);

export default router;