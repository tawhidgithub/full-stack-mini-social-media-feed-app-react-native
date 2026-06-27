import { Router } from "express";

import {
  createPost,
  getPosts,
  getPostById,
} from "../controllers/post.controller";

import authMiddleware from "../middleware/auth.middleware";
import { createPostValidator } from "../validators/post.validator";
import { validate } from "../validators/validation.middleware";

const router = Router();

router.post("/", authMiddleware, createPostValidator, validate, createPost);

router.get("/", authMiddleware, getPosts);

router.get("/:id", authMiddleware, getPostById);

export default router;
