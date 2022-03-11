import { Request, RequestHandler } from "express";
import { Session, SessionData } from "express-session";

// --- Controller Typings ---
type bAccReqBody = {
  clientData:
    | {
        customerID: string;
      }
    | Pick<TTransaction, "senderBAccID" | "receiverBAccID" | "amount">
    | { depositBAccID: string; depositAmount: number };
};

export type bAccRequestHandler = RequestHandler<
  { bAccountIDHere: string },
  xResBody,
  bAccReqBody,
  xReqQuery,
  xResLocals
>;

export type transactionRequestHandler = RequestHandler<{ bAccountIDHere: string }>;

// NOTE: might not need this, e.g req.session.customDataHere ?== res.locals
// export type xReq = Request & {
//   session: Session & Partial<SessionData> & { customDataHere?: string };
//   sessionID: string;
// };

export type xReqQuery = Record<string, unknown>;

// NOTE: no need typeguard, as here we put stuff inside serverData, not extract from it -> DGAF
export type xResBody = {
  msg: string;
  affectedResource: string;
  serverData?: TBankAccount | TCustomerAccount | TTransaction | TTransaction[];
};

export type xResLocals = Record<string, unknown>;

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

export type TTransaction = {
  id: string;
  senderBAccID: string;
  receiverBAccID: string;
  amount: number;
  transactedAt: Date;
};

// xoa
