import { RequestHandler } from "express";

import { TFinTransaction } from ".";
import { BaseReqQuery, BaseResBody, BaseResLocals } from "../util";

// --- Entity typings ---

export type TBankAccount = {
  id: string;
  iban: string;
  swift_bic: string;
  balance: number;
  customer_id: string;
  created_at: Date;
};

// --- Controllers typings ---

type BAccReqParams = {
  bAccIdHere: string;
};

type BAccResBody = BaseResBody & {
  serverData: TBankAccount | Record<string, never>;
};

type BAccReqBody = {
  clientData:
    | {
        customer_id: string;
      }
    | Pick<TFinTransaction, "sender_baccid" | "receiver_baccid" | "amount">
    | { depositBAccID: string; depositAmount: number }
    | { amount: number };
};

export type TBAccRequestHandler = RequestHandler<BAccReqParams, BAccResBody, BAccReqBody, BaseReqQuery, BaseResLocals>;
