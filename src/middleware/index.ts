import { Response } from "express";

export * from "./session.middleware";
export * from "./validation.middleware";
export * from "./auth.middleware";
export * from "./log_in_out.middleware";

// export enum HTTPStatusCode {
//   OK = 200,
//   CREATED = 201,
//   BAD_REQUEST = 400,
//   UNAUTHORIZED = 401,
//   FORBIDDEN = 403,
//   NOT_FOUND = 404
// }

// export const mddlwrFactory = (
//   res: Response,
//   statusCode: HTTPStatusCode,
//   msg: string,
//   affectedResource: string,
//   data: Record<string, string>
// ): void => {
//   res.status(statusCode).json({ msg, affectedResource, serverData: data });
// };
