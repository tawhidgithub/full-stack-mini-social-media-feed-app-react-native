import { body } from "express-validator";

export const createPostValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 500 })
    .withMessage("Post cannot exceed 500 characters"),
];
