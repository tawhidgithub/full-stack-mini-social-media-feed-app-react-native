import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  toggleLike,
  addComment,
  getComments,
} from "../controllers/interaction.controller";
import { createCommentValidator } from "../validators/comment.validator";
import { validate } from "../validators/validation.middleware";

const router = Router();

router.post("/posts/:id/like", authMiddleware, toggleLike);

router.post(
  "/posts/:id/comment",
  authMiddleware,
  createCommentValidator,
  validate,
  addComment,
);

router.get("/posts/:id/comments", authMiddleware, getComments);

export default router;
