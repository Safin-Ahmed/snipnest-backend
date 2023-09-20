import Joi from "joi";
export const paramIdSchema = Joi.object({
  id: Joi.string()
    .pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    .required(),
});
