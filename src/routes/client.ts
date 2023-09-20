import { Router } from "express";

const router = Router();

import { controllers as AuthController } from "../api/v1/auth";
import { controllers as SnippetController } from "../api/v1/snippets";
import { controllers as SnippetFileController } from "../api/v1/snippetFiles";
import { controllers as CommentController } from "../api/v1/comments";
import { controllers as StarController } from "../api/v1/stars";
import { authenticate, ownership, validate } from "../middleware";
import { refreshTokenSchema } from "../api/v1/auth/validation";
import {
  snippetCommentCreateSchema,
  snippetCreateSchema,
  snippetUpdateSchema,
} from "../api/v1/snippets/validation";
import { paramIdSchema } from "../validation";
import {
  snippetFileCreateSchema,
  snippetFileUpdateSchema,
} from "../api/v1/snippetFiles/validation";

// Auth Routes
router.post(
  "/auth/token/revoke",
  validate(refreshTokenSchema),
  authenticate,
  AuthController.revoke
);

// Snippet Routes

// Create a new snippet
router.post(
  "/snippets",
  authenticate,
  validate(snippetCreateSchema),
  SnippetController.create
);

// Create a new snippet file
router.post(
  "/snippets/files",
  authenticate,
  validate(snippetFileCreateSchema),
  SnippetFileController.create
);

// Updates an existing snippet file
router.patch(
  "/snippets/files/:id",
  authenticate,
  ownership("SnippetFile"),
  validate(paramIdSchema, "params"),
  validate(snippetFileUpdateSchema),
  SnippetFileController.updateOne
);

// Deletes an existing snippet file
router.delete(
  "/snippets/files/:id",
  authenticate,
  ownership("SnippetFile"),
  validate(paramIdSchema, "params"),
  SnippetFileController.removeItem
);

// Update a snippet
router.patch(
  "/snippets/:id",
  authenticate,
  ownership("Snippet"),
  validate(paramIdSchema, "params"),
  validate(snippetUpdateSchema),
  SnippetController.updateOne
);

// Delete a snippet
router.delete(
  "/snippets/:id",
  authenticate,
  ownership("Snippet"),
  validate(paramIdSchema, "params"),
  SnippetController.removeItem
);

// Post a comment for a snippet
router.post(
  "/snippets/:id/comments",
  authenticate,
  validate(paramIdSchema, "params"),
  validate(snippetCommentCreateSchema),
  SnippetController.postComment
);

// Post a star for a snippet
router.post(
  "/snippets/:id/stars",
  authenticate,
  validate(paramIdSchema, "params"),
  SnippetController.reactStar
);

// Remove a comment
router.delete(
  "/comments/:id",
  authenticate,
  ownership("Comment"),
  validate(paramIdSchema, "params"),
  CommentController.removeItem
);

// Remove a star
router.delete(
  "/stars/:id",
  authenticate,
  ownership("StarReact"),
  validate(paramIdSchema, "params"),
  StarController.removeItem
);

export default router;
