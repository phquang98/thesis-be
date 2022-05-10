import { RequestHandler } from "express";

import { HttpStatusCode } from "~/utils/constants";
import { TUAcc, TUInfo } from "~/types/business";

// --- Controller Typings ---

export type TBaseResBody = {
  statusCode: HttpStatusCode;
  msg: string;
  affectedResource: string;
};

export type TBaseReqQuery = Record<string, unknown>;

export type TBaseResLocals = Record<string, unknown>;

// --- Specific Middlewares Typings ---

// TODO: check if this works out, delete if unused
type ReqBodyRegister = {
  clientData: Pick<TUAcc, "accountName" | "accountPwd"> & Pick<TUInfo, "email" | "name">;
};

export type TReqHdlrRegister = RequestHandler<
  { userIdHere: string },
  TBaseResBody,
  ReqBodyRegister,
  TBaseReqQuery,
  TBaseResLocals
>;

type ReqBodyLogin = { clientData: Pick<TUAcc, "accountName" | "accountPwd"> };

export type TReqHdlrLogin = RequestHandler<
  { userIdHere: string },
  TBaseResBody,
  ReqBodyLogin,
  TBaseReqQuery,
  TBaseResLocals
>;

// NOTE: might not need this, e.g req.session.customDataHere ?== res.locals
// export type xReq = Request & {
//   session: Session & Partial<SessionData> & { customDataHere?: string };
//   sessionID: string;
// };
