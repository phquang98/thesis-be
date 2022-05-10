import { RequestHandler } from "express";

import { TBaseReqQuery, TBaseResBody, TBaseResLocals } from "~/types/system";

// --- Entity typings ---

export type TUInfo = {
  id: string;
  name: string;
  email: string;
  age?: number;
  address?: string;
  gender?: string;
  pnum?: string;
};

// --- Controllers typings ---

type UInfoReqParams = {
  userIdHere: string;
};

type UInfoResBody = TBaseResBody & {
  serverData: Record<string, never> | TUInfo;
};

type UInfoReqBody = {
  clientData: TUInfo;
};

export type TUInfoRequestHandler = RequestHandler<
  UInfoReqParams,
  UInfoResBody,
  UInfoReqBody,
  TBaseReqQuery,
  TBaseResLocals
>;
