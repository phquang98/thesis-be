import { RequestHandler } from "express";
import validator from "validator";

import { isReqParamsAsExpected } from "../util";

// NOTE: logic may be wrong here, what if >2 path var
export const checkReqParams: RequestHandler = (req, res, next) => {
  for (const pathVar in req.params) {
    if (isReqParamsAsExpected(pathVar)) {
      return next();
    }
  }
  return res.status(400).json({ msg: "req params failed" });
};

export const bAccReqBodyMddlwr = (suspectKeyClt: string[]): RequestHandler => {
  const checkReqBody: RequestHandler = (req, res, next) => {
    if ("clientData" in req.body && suspectKeyClt.every((ele) => ele in req.body.clientData)) {
      return next();
    }

    return res.status(400).json({ msg: "body missing/malformed" });
  };
  return checkReqBody;
};
