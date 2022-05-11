import { ErrorRequestHandler } from "express";
import { SimpleError } from "~/utils";

export const errorHdlr: ErrorRequestHandler = (errCtxHere: SimpleError, req, res, _next) => {
  console.log("running");
  const errResData = {
    name: errCtxHere.name,
    message: errCtxHere.message,
    affectedResource: errCtxHere.affectedResource,
    statusCode: errCtxHere.statusCode
  };

  return res.status(errResData.statusCode).json(errResData);
};
