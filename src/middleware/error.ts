import express from "express";
import { ICustomError } from "../interfaces";
const notFoundErrorHandler = (
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  const error: ICustomError = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
};

const globalErrorHandler = (
  error: ICustomError,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errorResponse = {
    code: error.status,
    error: error.message,
  };

  if (error.status && error.status === 400) {
    return res.status(error.status).json({
      ...errorResponse,
      data: error.data,
    });
  }

  if (error.status && error.status === 404) {
    return res.status(error.status).json({
      ...errorResponse,
      message: "Requested resource not found",
    });
  }

  if (error.status) {
    return res.status(error.status).json(errorResponse);
  }
  console.log(error);
  res.status(500).json({
    code: 500,
    error: "Internal Server Error",
    message: error.message || "Please try again later",
  });

  next();
};

export { notFoundErrorHandler, globalErrorHandler };
