import { RequestHandler } from "express";
import { HttpStatusCode, SimpleError } from "~/utils";

export const rogueHdlr: RequestHandler = (_req, _res, next) => {
  return next(
    new SimpleError({
      message: "The request endpoint does not existed!",
      affectedResource: "Middleware",
      statusCode: HttpStatusCode.NOT_FOUND
    })
  );
};
