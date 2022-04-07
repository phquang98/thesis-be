import { RequestHandler } from "express";

// --- Controller Typings ---

// NOTE: check README

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

export type uInfoRequestHandler = RequestHandler<{ userIdHere: string }, xResBody, uInfoReqBody, xReqQuery, xResLocals>;

export type bAccRequestHandler = RequestHandler<{ bAccIdHere: string }, xResBody, bAccReqBody, xReqQuery, xResLocals>;

export type transactionRequestHandler = RequestHandler<{ bAccIdHere: string }>;

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

export type TUserAcc = {
  account_name: string;
  account_pwd: string;
  is_admin: boolean;
  user_id: string;
};

// --- Custom defined type guards ---

/**
 * Predicate fnc return boolean based on if keyHere belongs in objHere and keyHere is a property of type T. Use when have an obj and unsure its types, but take a guess it is from type T
 *
 * @param keyHere
 * @param objHere
 * @returns
 * <https://stackoverflow.com/a/58962072/8834000>
 */

export function isObjKey<T>(keyHere: PropertyKey, objHere: T): keyHere is keyof T {
  return keyHere in objHere;
}
