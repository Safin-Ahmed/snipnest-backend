import Joi from "joi";

export const findAllSnippetSchema = Joi.object({
  page: Joi.number()
    .integer()
    .custom((v) => +v),
  limit: Joi.number()
    .integer()
    .custom((v) => +v),
  sort: Joi.string()
    .min(5)
    .max(20)
    .custom((v) => {
      if (!v.includes(":") || !v.split(":")) {
        throw new Error(
          "Invalid Format. Please provide the value in this format: [property]:[order]"
        );
      }
    }),
  search: Joi.string().min(5),
});

export const findOneSnippetQuerySchema = Joi.object({
  expand: Joi.string()
    .min(5)
    .custom((v) => {
      if (v.includes(" ") && v.split(" ").length === 1) {
        return v;
      }

      if (v.includes(",") && v.split(",").length > 1) {
        throw new Error(
          "Invalid format: Please provide space seperated strings"
        );
      }
    }),

  fields: Joi.string()
    .min(5)
    .custom((v) => {
      if (v.includes(" ") && v.split(" ").length === 1) {
        return v;
      }

      if (v.includes(",") && v.split(",").length > 1) {
        throw new Error(
          "Invalid format: Please provide space seperated strings"
        );
      }
    }),
});

export const snippetCreateSchema = Joi.object({
  title: Joi.string().trim().min(5).max(40).required(),
  description: Joi.string().min(10).max(50),
  languages: Joi.array().items(Joi.string()),
  snippet_files: Joi.array().items(Joi.string()),
  status: Joi.string().valid("published", "draft", "unlisted"),
});

export const snippetUpdateSchema = Joi.object({
  title: Joi.string().trim().min(5).max(40),
  description: Joi.string().min(10).max(50),
  languages: Joi.array().items(Joi.string()),
  snippet_files: Joi.array().items(Joi.string()),
  status: Joi.string().valid("published", "draft", "unlisted"),
});

export const snippetCommentCreateSchema = Joi.object({
  content: Joi.string().min(5).required(),
});
