import { uAccRepo } from "~/features/UserAccount/UserAccount.repository";
import { TReqHdlrLogin } from "~/types/system";
import { HttpStatusCode, SimpleError } from "~/utils";

const affectedResource = "Login Middleware";

export const loginHdlr: TReqHdlrLogin = async (req, res, next) => {
  const { accountName, accountPwd } = req.body.clientData;

  try {
    const suspect = await uAccRepo.findOneRecordByAccountName(accountName);
    if (suspect && suspect.accountPwd === accountPwd) {
      return res.status(HttpStatusCode.OK).json({
        message: "Login successful! FIX THISSSSSSSS",
        affectedResource,
        statusCode: HttpStatusCode.OK
      }); // TODO: next() -> createSessCtr
    }
    return next(
      new SimpleError({ message: "Wrong credentials!", affectedResource, statusCode: HttpStatusCode.BAD_REQUEST })
    );
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

// Explain:
// Data submitted from FE -> findOne(account_name) in UAcc resource
// if found -> check res.body.pwd === found.pwd -> OK or failed
