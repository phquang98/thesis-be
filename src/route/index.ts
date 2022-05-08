import express from "express";

import { healthCheckHdlr } from "~/middleware/healthCheck"; // should be wrapped inside a resource router instead
import { resourceRouter } from "~/route/business/resource.route";

const appRouter = express.Router();

appRouter.get("/healthcheck", healthCheckHdlr);

appRouter.use("/resource", resourceRouter);

export { appRouter };
