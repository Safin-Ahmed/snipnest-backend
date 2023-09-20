import express from "express";
import {
  applyMiddleware,
  notFoundErrorHandler,
  globalErrorHandler,
} from "./middleware";
import routes from "./routes";
import { combineRoutes } from "./utils";

const app = express();

// Apply all third party middlewares
applyMiddleware(app);

// Routes
combineRoutes(app, routes);

// health route
app.get("/health", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

// Handle not found errors
app.use(notFoundErrorHandler);

// Handle global errors
app.use(globalErrorHandler);

export default app;
