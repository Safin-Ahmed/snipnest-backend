import Joi from "joi";

export const findAllSnippetFilesSchema = Joi.object({
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

export const findOneSnippetFileQuerySchema = Joi.object({
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

export const snippetFileCreateSchema = Joi.object({
  filename: Joi.string().trim().min(5).max(40).required(),
  content: Joi.string(),
  language: Joi.string(),
  snippet: Joi.string(),
});

export const snippetFileUpdateSchema = Joi.object({
  filename: Joi.string().trim().min(5).max(40),
  content: Joi.string(),
  language: Joi.string(),
  snippet: Joi.string(),
});
