import express from "express";
const combineRoutes = (app: express.Express, routes) => {
  if (routes.publicRouter) {
    app.use("/api/v1/public", routes.publicRouter);
  }

  if (routes.clientRouter) {
    app.use("/api/v1/private", routes.clientRouter);
  }

  if (routes.adminRouter) {
    app.use("/api/v1/admin", routes.adminRouter);
  }
};

export default combineRoutes;
