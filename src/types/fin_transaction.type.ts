import { RequestHandler } from "express";

import { BaseReqQuery, BaseResBody, BaseResLocals } from "../util";

// --- Entity typings ---

export type TFinTransaction = {
  id: string;
  sender_baccid: string;
  receiver_baccid: string;
  amount: number;
  transacted_at: Date;
};

// --- Controllers typings ---

type FinTransactionReqParams = { bAccIdHere: string };

type FinTransactionResBody = BaseResBody & {
  serverData: TFinTransaction[] | Record<string, never>;
};

type FinTransactionReqBody = {
  clientData: Pick<TFinTransaction, "sender_baccid" | "receiver_baccid" | "amount">;
};

export type TFinTransactionRequestHandler = RequestHandler<
  FinTransactionReqParams,
  FinTransactionResBody,
  FinTransactionReqBody,
  BaseReqQuery,
  BaseResLocals
>;
