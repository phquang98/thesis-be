/* eslint-disable @typescript-eslint/no-magic-numbers */
import { RequestHandler } from "express";

import Joi from "joi";

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

// --- Validation Schema ---

export const clientSchemaUInfo = Joi.object<TUInfo>({
  id: Joi.string().guid().required(),
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().less(130),
  address: Joi.string(),
  gender: Joi.string(),
  pnum: Joi.string()
});

// export const reqBodySchemaUInfo = {
//   clientData: Joi.object<TUInfo>({
//     id: Joi.string().guid().required(),
//     name: Joi.string().max(30).required(),
//     email: Joi.string().email().required(),
//     age: Joi.number().integer().less(130),
//     address: Joi.string(),
//     gender: Joi.string(),
//     pnum: Joi.string()
//   })
// };

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
