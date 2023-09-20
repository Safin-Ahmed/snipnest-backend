import { ICustomError } from "../interfaces";

export const notFound = (msg = "Resource not found") => {
  const error: ICustomError = new Error(msg);
  error.status = 404;

  return error;
};

export const badRequest = () => {
  const error: ICustomError = new Error("Invalid parameters");
  error.status = 400;

  return error;
};

export const authError = (msg = "Authentication Failed") => {
  const error: ICustomError = new Error(msg);
  error.status = 401;
  return error;
};

export const authzError = (msg = "Access Forbidden") => {
  const error: ICustomError = new Error(msg);
  error.status = 403;

  return error;
};
