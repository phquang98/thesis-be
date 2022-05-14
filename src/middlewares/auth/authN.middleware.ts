import { RequestHandler } from "express";
import { HttpStatusCode, SimpleError } from "~/utils";

// Authentication: check if Request has cookie contains sid + sid existed in `session` database
// Note: express-session will automatically fetch session record based on sid, only need to make sure client send req with cookie having sid inside
export const authN: RequestHandler<{ userIdHere?: string }> = (req, _res, next) => {
  // console.log("authN", req.sessionID, req.session);
  const { userId } = req.session;

  // worthless, as every request will have a sessionID, what matters is do it existed in DB or not
  // if (!req.sessionID) {
  //   ...codeHere
  // }

  // AuthN: don't have userId -> not yet saved in `session` table -> not logged in
  if (userId) {
    return next();
  }
  return next(
    new SimpleError({
      message: "Authentication failed! Session not recognized in database! Session do not contains userId!",
      affectedResource: "Authentication Middleware",
      statusCode: HttpStatusCode.UNAUTHENTICATED
    })
  );
};
