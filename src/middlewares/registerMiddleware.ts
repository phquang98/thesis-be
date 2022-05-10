import { uAccRepo } from "~/resources/UserAccount/UserAccount.repository";
import { uInfoRepo } from "~/resources/UserInfo/UserInfo.repository";
import { TReqHdlrRegister } from "~/types/system";
import { BaseError, HttpStatusCode, generateUser } from "~/utils";

export const registerHdlr: TReqHdlrRegister = async (req, res, _next) => {
  const { clientData } = req.body;
  console.log("asd", clientData);

  try {
    // const suspect = await uInfoTypeORMRepo.findOne({ where: { email: clientData.email } });
    const suspect = await uInfoRepo.findOneRecordByEmail(clientData.email);
    console.log("suspect", suspect);
    if (suspect) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Email already in used!",
        affectedResource: "UserAccount, UserInfo"
      });
    }
    const [userInfoData, userAccData] = generateUser(clientData);
    await uInfoRepo.createAndSaveOneRecord(userInfoData); // this runs 1st cause FK
    await uAccRepo.createAndSaveOneRecord(userAccData);
    return res.status(HttpStatusCode.CREATED).json({
      statusCode: HttpStatusCode.CREATED,
      msg: "User account created.",
      affectedResource: "UserAccount, UserInfo"
    });
  } catch (err) {
    if (err instanceof Error) {
      // throw new BaseError({ message: err.message, statusCode: HttpStatusCode.BAD_REQUEST });
      throw new Error("Something wrong!");
    }
  }
};

// Explain:
// 1. email already existed -> 400 error
// 2. body OK
// 3. external error
