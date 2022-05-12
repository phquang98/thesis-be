import { RequestHandler } from "express";

import { TBaseReqQuery, TBaseResBody, TBaseResLocals } from "~/types/system";

// --- Entity typings ---

export type TBAcc = {
  id: string;
  iban: string;
  swiftBIC: string;
  balance: number;
  userId: string;
  createdAt: Date;
};

// --- Controllers typings ---

type BAccReqParams = {
  bAccIdHere: string;
};

type BAccResBody = TBaseResBody & {
  serverData: Record<string, never> | TBAcc;
};

type BAccReqBody = {
  clientData: Pick<TBAcc, "userId">;
};

export type TBAccRequestHandler = RequestHandler<
  BAccReqParams,
  BAccResBody,
  BAccReqBody,
  TBaseReqQuery,
  TBaseResLocals
>;
