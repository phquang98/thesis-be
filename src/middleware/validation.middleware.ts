import { RequestHandler } from "express";

// Helpers func: check internally if route have the path var named like literals below
const reqParamsExpectedClt = ["userIdHere", "bAccIdHere", "finTransIdHere"] as const;
export type TExpectedReqParams = typeof reqParamsExpectedClt[number];
export const isExpectedReqParams = (reqParamKey: string): reqParamKey is TExpectedReqParams => {
  return (reqParamsExpectedClt as readonly string[]).indexOf(reqParamKey) >= 0;
};

// Check if params has necessary path variables, READ BELOW
export const checkReqParamsMddlwr: RequestHandler = (req, res, next) => {
  for (const pathVar in req.params) {
    if (isExpectedReqParams(pathVar)) {
      return next();
    }
  }
  return res
    .status(400)
    .json({ msg: "Request parameters not recognized or missing!", affectedResource: "Params Middleware" });
};

// Check if body has all necessary props
export const checkReqBodyMddlwr = (suspectKeyClt: string[]): RequestHandler => {
  const checkReqBody: RequestHandler = (req, res, next) => {
    if ("clientData" in req.body && suspectKeyClt.every((ele) => ele in req.body.clientData)) {
      return next();
    }

    return res.status(400).json({ msg: "Request body missing or invalid!", affectedResource: "Body Middleware" });
  };
  return checkReqBody;
};

/** Explain: usually put these 1st in every route for props narrowing
 *
 * checkReqParamsMddlwr: Probably useless, only for internal TS code checking, e.g has route POST localhost:4000/:resourceIDHere/ -> POSTMAN POST localhost:4000/:resourceIDHere/ but resourceIDHere null -> server will understand POST localhost:4000//
 *
 */
