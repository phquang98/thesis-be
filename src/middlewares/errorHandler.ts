import { ErrorRequestHandler } from "express";
import { BaseError } from "~/utils";

export const errorHdlr: ErrorRequestHandler = (err: BaseError, req, res, _next) => {
  console.log("running");
  const errResData = {
    name: err.name,
    message: err.message,
    statusCode: err.statusCode
  };

  return res.status(errResData.statusCode).json(errResData);
};
