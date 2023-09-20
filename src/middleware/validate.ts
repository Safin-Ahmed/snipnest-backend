import { ICustomError } from "../interfaces";
import { transformValidationErrors } from "../utils/validation";

const validate =
  (schema, location = "body") =>
  async (req, _res, next) => {
    try {
      await schema.validateAsync(req[location], {
        abortEarly: false,
      });

      next();
    } catch (err: any) {
      const error: ICustomError = new Error("Bad Request");
      error.status = 400;
      if (Array.isArray(err.details)) {
        console.error(err.details);
        error.data = transformValidationErrors(err);
      } else {
        const key = err.message.split(" ")[0].toLowerCase();
        error.data = {
          [key]: err.message,
        };
      }
      next(error);
    }
  };

export default validate;
