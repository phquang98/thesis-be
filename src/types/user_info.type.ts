import { RequestHandler } from "express";

import { BaseReqQuery, BaseResBody, BaseResLocals } from "../util";

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

type UInfoResBody = BaseResBody & {
  serverData: TUInfo | Record<string, never>;
};

type UInfoReqBody = {
  clientData: TUInfo;
};

export type TUInfoRequestHandler = RequestHandler<
  UInfoReqParams,
  UInfoResBody,
  UInfoReqBody,
  BaseReqQuery,
  BaseResLocals
>;
