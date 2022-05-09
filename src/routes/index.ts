import express from "express";

import { healthCheckHdlr } from "~/middlewares/healthCheck";
import { businessRouter } from "~/routes/business";

const appRouter = express.Router();

appRouter.get("/healthcheck", healthCheckHdlr);

appRouter.use("/api", businessRouter);

export { appRouter };
