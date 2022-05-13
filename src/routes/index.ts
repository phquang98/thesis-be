import express from "express";

import { healthCheckHdlr, loginHdlr, registerHdlr } from "~/middlewares";
import { businessRouter } from "~/routes/business";

const appRouter = express.Router();

appRouter.get("/healthcheck", healthCheckHdlr);

appRouter.post("/register", registerHdlr);
appRouter.post("/login", loginHdlr);
// appRouter.post("/login", loginHandler, createSession);
// appRouter.post("/:userIdHere/reload", reloadSession);
// appRouter.post("/:userIdHere/logout", deleteSession);

appRouter.use("/api", businessRouter);

export { appRouter };
