import express from "express";

import { healthCheckHdlr } from "~/middlewares/healthCheck";
import { loginHdlr } from "~/middlewares/loginMiddleware";
import { registerHdlr } from "~/middlewares/registerMiddleware";
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
