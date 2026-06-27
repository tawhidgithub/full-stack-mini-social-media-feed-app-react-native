import { body } from "express-validator";

export const createCommentValidator = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("text is required")
    .isLength({ max: 200 })
    .withMessage("Comment cannot exceed 200 characters"),
];
