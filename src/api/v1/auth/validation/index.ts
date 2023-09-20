import Joi from "joi";
import { verifyEmail, verifyUsername } from "../../../../utils";

export const userRegisterSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(30)
    .external(verifyUsername)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .external(verifyEmail)
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, a capital letter, a small letter, at least a number and at least a special character",
    }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string().trim().required(),
});

export const refreshTokenSchema = Joi.object({
  token: Joi.string().trim().required(),
});
