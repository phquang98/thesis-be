import { RequestHandler } from "express";

import { isReqParamsAsExpected } from "../util";

// Check if params has necessary path variables, READ BELOW
export const checkReqParamsMddlwr: RequestHandler = (req, res, next) => {
  for (const pathVar in req.params) {
    if (isReqParamsAsExpected(pathVar)) {
      return next();
    }
  }
  console.log("lay nguoi", req.params);
  return res.status(400).json({ msg: "Request parameters not recognized or missing!", affectedResource: "Middleware" });
};

// Check if body has all necessary props
export const checkReqBodyMddlwr = (suspectKeyClt: string[]): RequestHandler => {
  const checkReqBody: RequestHandler = (req, res, next) => {
    if ("clientData" in req.body && suspectKeyClt.every((ele) => ele in req.body.clientData)) {
      return next();
    }

    return res.status(400).json({ msg: "Request body missing or invalid!", affectedResource: "Middleware" });
  };
  return checkReqBody;
};

/** Explain: usually put these 1st in every route for props narrowing
 *
 * checkReqParamsMddlwr: Probably useless, only for internal TS code checking, e.g has route POST localhost:4000/:resourceIDHere/ -> POSTMAN POST localhost:4000/:resourceIDHere/ but resourceIDHere null -> server will understand POST localhost:4000//
 *
 */
