import express from "express";

import { healthCheckHdlr, loginHdlr, registerHdlr } from "~/middlewares";
import { authN } from "~/middlewares/auth/authN.middleware";
import { createSess, deleteSess, reloadSess } from "~/middlewares/session/session.middleware";
import { businessRouter } from "~/routes/business";

const appRouter = express.Router();

appRouter.get("/healthcheck", healthCheckHdlr);

appRouter.post("/register", registerHdlr);
appRouter.post("/login", loginHdlr, createSess);
appRouter.post("/:userIdHere/reload", reloadSess);
appRouter.post("/:userIdHere/logout", deleteSess);

appRouter.use("/api", authN);
appRouter.use("/api", businessRouter);

export { appRouter };
