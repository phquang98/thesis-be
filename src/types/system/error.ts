import { HttpStatusCode } from "~/utils";

/* eslint-disable @typescript-eslint/no-magic-numbers */
export type TBaseErrorData = {
  message: string;
  affectedResource: string;
  statusCode: HttpStatusCode;
};
