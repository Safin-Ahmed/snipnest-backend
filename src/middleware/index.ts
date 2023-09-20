import express from "express";
import requestIp from "request-ip";
import morgan from "morgan";
import cors from "cors";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import { globalErrorHandler, notFoundErrorHandler } from "./error";
import validate from "./validate";
import authenticate from "./authenticate";
import authorize from "./authorize";
import ownership from "./ownership";

const swaggerDoc = YAML.load("./swagger.yaml");

const applyMiddleware = (app: express.Application) => {
  // Third party middlewares
  app.use([express.json(), morgan("dev"), cors(), requestIp.mw()]);

  // Swagger Doc
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
};

export {
  applyMiddleware,
  globalErrorHandler,
  notFoundErrorHandler,
  validate,
  authenticate,
  authorize,
  ownership,
};
