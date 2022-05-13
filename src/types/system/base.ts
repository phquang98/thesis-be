import { RequestHandler } from "express";

import { HttpStatusCode } from "~/utils/constants";
import { TUAcc, TUInfo } from "~/types/business";

// --- Controller Typings ---

export type TBaseResBody = {
  statusCode: HttpStatusCode;
  message: string;
  affectedResource: string;
};

export type TBaseReqQuery = Record<string, unknown>;

export type TBaseResLocals = Record<string, unknown>;

// --- Specific Middlewares Typings ---

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

type ResBodyLogin = TBaseResBody & {
  serverData: {
    userId: string;
    sid: string;
  };
};

export type TReqHdlrLogin = RequestHandler<
  { userIdHere: string },
  ResBodyLogin,
  ReqBodyLogin,
  TBaseReqQuery,
  TBaseResLocals
>;

// --- Session Middleware ---

export type TCreateSessHdlr = TReqHdlrLogin;
export type TReloadSessHdlr = RequestHandler<{ userIdHere: string }, ResBodyLogin>;
export type TDeleteSessHdlr = RequestHandler<{ userIdHere: string }, TBaseResBody>;

// NOTE: might not need this, e.g req.session.customDataHere ?== res.locals
// export type xReq = Request & {
//   session: Session & Partial<SessionData> & { customDataHere?: string };
//   sessionID: string;
// };
