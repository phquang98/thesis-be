import { RequestHandler } from "express";

import { TBaseResBody, TBaseReqQuery, TBaseResLocals } from "~/types/system";

// --- Entity typings ---

export type TFinTransaction = {
  id: string;
  amount: number;
  receiverBAccId: string;
  senderBAccId: string;
  transactedAt: Date;
};

// --- Controllers typings ---

type FinTransactionReqParams = { finTransactIdHere: string };

type FinTransactionResBody = TBaseResBody & {
  serverData: Record<string, never> | TFinTransaction | TFinTransaction[];
};

type FinTransactionReqBody = {
  clientData: Pick<TFinTransaction, "amount" | "receiverBAccId" | "senderBAccId"> | { bAccIdHere: string };
};

export type TFinTransactionRequestHandler = RequestHandler<
  FinTransactionReqParams,
  FinTransactionResBody,
  FinTransactionReqBody,
  TBaseReqQuery,
  TBaseResLocals
>;
