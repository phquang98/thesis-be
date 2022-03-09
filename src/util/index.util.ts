import { Request, RequestHandler } from "express";
import { Session, SessionData } from "express-session";

// --- Controller Typings ---

export type xRequestHandler = RequestHandler<xReqParams, xResBody, xReqBody, xReqQuery, xResLocals>;

// NOTE: might not need this, e.g req.session.customDataHere ?== res.locals
// export type xReq = Request & {
//   session: Session & Partial<SessionData> & { customDataHere?: string };
//   sessionID: string;
// };

type xReqParams = Record<string, string> | { bAccountIDHere: string };

type xReqBody = {
  clientData: {
    customerID: string;
  };
};

type xReqQuery = Record<string, unknown>;

// NOTE: no need typeguard, as here we put stuff inside serverData, not extract from it -> DGAF
type xResBody = {
  msg: string;
  affectedResource: string;
  serverData?: TBankAccount | TCustomerAccount;
};

type xResLocals = Record<string, unknown>;

// --- Application Typings ---

export type TBankAccount = {
  id: string;
  iban: string;
  swift_bic: string;
  balance: number;
  customerID: string;
  createdAt: Date;
};

type TUser = {
  id: string;
  name: string;
  age: number;
  email: string;
  address: string;
  gender: string;
  pnum: string;
};

export type TCustomerAccount = TUser & { isAdmin: false; pwd: string };

export type TAdminAccount = TUser & { isAdmin: true; pwd: string };
