import { RequestHandler } from "express";
import { bAccRepo } from "~/features/BankAccount/BankAccount.repository";
import { HttpStatusCode, SimpleError } from "~/utils";

const affectedResource = "Authorization Middleware";

// Authorization: check if Client can only request access to their resources
// Note: these two must match
// - req.params.userIdHere: resource belong to this client
// - req.session.user_id: identity of the client
export const authZUserId: RequestHandler<{ userIdHere: string }> = (req, res, next) => {
  // console.log("authZ", req.sessionID, req.session);
  const { userId } = req.session;

  if (userId) {
    // req.session.userId will be populated after visited /login
    // AuthZ: only person can interacted with their own stuffs
    if (userId === req.params.userIdHere) {
      return next();
    }
    return next(
      new SimpleError({
        message: "Authorization failed!",
        affectedResource,
        statusCode: HttpStatusCode.UNAUTHORIZED
      })
    );
  }
  return next(
    new SimpleError({
      message: "User ID not existed in session for some reason!",
      affectedResource: "Authorization Middleware",
      statusCode: HttpStatusCode.BAD_REQUEST
    })
  );
};

// NOTE: flaw, need rework
// export const authZBAccId: RequestHandler<{ bAccIdHere: string }> = async (req, res, next) => {
//   // console.log("authZ", req.sessionID, req.session);
//   const { userId } = req.session;

//   if (userId) {
//     // req.session.userId will be populated after visited /login
//     // AuthZ: only person can interacted with their own stuffs
//     const suspect = await bAccRepo.findOneRecordByUserId(userId);
//     if (suspect && suspect.userId === userId) {
//       return next();
//     }
//     return next(
//       new SimpleError({
//         message: "Authorization failed!",
//         affectedResource,
//         statusCode: HttpStatusCode.UNAUTHORIZED
//       })
//     );
//   }
//   return next(
//     new SimpleError({
//       message: "User ID not existed in session for some reason!",
//       affectedResource: "Authorization Middleware",
//       statusCode: HttpStatusCode.BAD_REQUEST
//     })
//   );
// };

// NOTE: too complicated atm
// export const authZFinTransactId: RequestHandler<{ bAccIdHere: string }> = async (req, res, next) => {}
