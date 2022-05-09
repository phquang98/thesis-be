import { RequestHandler } from "express";

import { HttpStatusCode } from "~/utils/constants";

export const healthCheckHdlr: RequestHandler = (req, res, _next) => {
  return res.status(HttpStatusCode.OK).json({ msg: "Health check OK!" });
};
