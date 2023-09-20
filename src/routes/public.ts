import { Router } from "express";

const router = Router();

import { controllers as AuthController } from "../api/v1/auth";
import { controllers as SnippetController } from "../api/v1/snippets";
import { controllers as SnippetFileController } from "../api/v1/snippetFiles";
import { validate } from "../middleware";
import { userLoginSchema, userRegisterSchema } from "../api/v1/auth/validation";
import { refreshTokenSchema } from "../api/v1/auth/validation";
import {
  findAllSnippetSchema,
  findOneSnippetQuerySchema,
} from "../api/v1/snippets/validation";
import { paramIdSchema } from "../validation";
import {
  findAllSnippetFilesSchema,
  findOneSnippetFileQuerySchema,
} from "../api/v1/snippetFiles/validation";

// Auth routes
router.post(
  "/auth/register",
  validate(userRegisterSchema),
  AuthController.register
);

router.post("/auth/login", validate(userLoginSchema), AuthController.login);

router.post(
  "/auth/token/refresh",
  validate(refreshTokenSchema),
  AuthController.refresh
);

router.post(
  "/auth/token/validate",
  validate(refreshTokenSchema),
  AuthController.validateToken
);

// Snippets Routes

// get all snippets
router.get(
  "/snippets",
  validate(findAllSnippetSchema, "query"),
  SnippetController.findAll
);

// Get all snippet files
router.get(
  "/snippets/files",
  validate(findAllSnippetFilesSchema, "query"),
  SnippetFileController.findAll
);

// Get single snippet file
router.get(
  "/snippets/files/:id",
  validate(paramIdSchema, "params"),
  validate(findOneSnippetFileQuerySchema, "query"),
  SnippetFileController.findOne
);

// get a single snippet by id
router.get(
  "/snippets/:id",
  validate(paramIdSchema, "params"),
  validate(findOneSnippetQuerySchema, "query"),
  SnippetController.findOne
);

// get all comments for a single snippet by id
router.get(
  "/snippets/:id/comments",
  validate(paramIdSchema, "params"),
  validate(findAllSnippetSchema),
  SnippetController.findAllComments
);

// get all star reacts for a single snippet by id
router.get(
  "/snippets/:id/stars",
  validate(paramIdSchema, "params"),
  validate(findAllSnippetSchema),
  SnippetController.findAllStars
);

export default router;
