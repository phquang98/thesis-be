/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { uAccRepo } from "~/features/UserAccount/UserAccount.repository";
import { TCreateSessHdlr, TDeleteSessHdlr, TReloadSessHdlr } from "~/types/system";
import { HttpStatusCode, SimpleError } from "~/utils";

const affectedResource = "Session Middleware";

export const createSess: TCreateSessHdlr = async (req, res, next) => {
  // refuses already logged-in user
  if (req.session.userId) {
    return next(
      new SimpleError({
        message: `Session existed already! userId: ${req.session.userId} | this sessionID: ${req.sessionID}`,
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }

  // else find the UAcc with the creds, then put the userId inside the sess record -> write to DB
  const { accountName } = req.body.clientData;
  try {
    const loggingInUAcc = await uAccRepo.findOneRecordByAccountName(accountName);
    req.session.userId = loggingInUAcc?.user_id as string; // NOTE: dirty, maybe put in res.locals

    return res.status(HttpStatusCode.OK).json({
      message: `Session created userId: ${req.session.userId} | this sessionID: ${req.sessionID}`,
      affectedResource,
      statusCode: HttpStatusCode.OK,
      serverData: {
        userId: req.session.userId,
        sid: req.sessionID
      }
    });
  } catch (error) {
    return next(
      new SimpleError({
        message: "Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};

export const reloadSess: TReloadSessHdlr = (req, res, next) => {
  // console.log("RELOAD-SESS LOG:", req.session, req.sessionID, req.session.userId);
  if (req.session.userId) {
    req.session.reload((err) => {
      if (err) {
        return next(
          new SimpleError({
            message: "Failed to reload session",
            affectedResource,
            statusCode: HttpStatusCode.BAD_REQUEST
          })
        );
      }
    });
    return res.status(HttpStatusCode.OK).json({
      message: "Session reloaded, extended ttl!",
      statusCode: HttpStatusCode.OK,
      affectedResource: "Session Middleware",
      serverData: {
        userId: req.session.userId,
        sid: req.sessionID
      }
    });
  }
  return next(
    new SimpleError({
      message: `Session not recognized! Probably missing userId prop in sess record.`,
      affectedResource,
      statusCode: HttpStatusCode.BAD_REQUEST
    })
  );
};

export const deleteSess: TDeleteSessHdlr = (req, res, next) => {
  // console.log("DEL-SESS LOG:", req.session, req.sessionID, req.session.userId);

  // only logged in can use this -> userId must be in session obj
  if (req.session.userId) {
    req.session.destroy((err) => {
      if (err) {
        console.log("chay 1");
        return next(
          new SimpleError({
            message: `Failed to destroy session ${req.sessionID}`,
            affectedResource,
            statusCode: HttpStatusCode.BAD_REQUEST
          })
        );
      }
    });
    return res.status(HttpStatusCode.OK).json({
      message: `Session ${req.sessionID} deleted!`,
      affectedResource,
      statusCode: HttpStatusCode.OK
    });
  }
  return next(
    new SimpleError({
      message: `Session not recognized! Probably missing userId prop in sess record.`,
      affectedResource,
      statusCode: HttpStatusCode.BAD_REQUEST
    })
  );
};
