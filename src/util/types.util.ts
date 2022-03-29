import { RequestHandler } from "express";

// --- Controller Typings ---

type bAccReqBody = {
  clientData:
    | {
        customer_id: string;
      }
    | Pick<TFinTransaction, "sender_baccid" | "receiver_baccid" | "amount">
    | { depositBAccID: string; depositAmount: number }
    | { amount: number };
};

type uInfoReqBody = {
  clientData: TUInfo;
};

export type uInfoRequestHandler = RequestHandler<{ userIDHere: string }, xResBody, uInfoReqBody, xReqQuery, xResLocals>;

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
  serverData?: TBankAccount | TCustomerAccount | TFinTransaction | TFinTransaction[] | TUInfo;
};

export type xResLocals = Record<string, unknown>;

// --- Application Typings ---

export type TBankAccount = {
  id: string;
  iban: string;
  swift_bic: string;
  balance: number;
  customer_id: string;
  created_at: Date;
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

export type TCustomerAccount = TUser & { is_admin: false; pwd: string };

export type TAdminAccount = TUser & { is_admin: true; pwd: string };

export type TFinTransaction = {
  id: string;
  sender_baccid: string;
  receiver_baccid: string;
  amount: number;
  transacted_at: Date;
};

export type TUInfo = {
  id: string;
  name: string;
  email: string;
  age?: number;
  address?: string;
  gender?: string;
  pnum?: string;
};
