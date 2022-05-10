import { uAccRepo } from "~/resources/UserAccount/UserAccount.repository";
import { TReqHdlrLogin } from "~/types/system";
import { HttpStatusCode } from "~/utils";

export const loginHdlr: TReqHdlrLogin = async (req, res, _next) => {
  try {
    const { accountName, accountPwd } = req.body.clientData;
    const suspect = await uAccRepo.findOneRecordByAccountName(accountName);
    if (suspect) {
      return suspect.accountPwd === accountPwd
        ? res.status(200).json({ statusCode: 200, msg: "OK", affectedResource: "UserAccount" }) // TODO: fix this shit
        : res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            msg: "Wrong credentials!",
            affectedResource: "UserAccount"
          });
    }
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      statusCode: HttpStatusCode.BAD_REQUEST,
      msg: "Credentials not existed!",
      affectedResource: "Login Middleware"
    });
  } catch (error) {
    throw new Error("Something wrong");
  }
};

// Explain:
// Data submitted from FE -> findOne(account_name) in UAcc resource
// if found -> check res.body.pwd === found.pwd -> OK or failed
