import { uAccRepo } from "~/resources/UserAccount/UserAccount.repository";
import { uInfoRepo } from "~/resources/UserInfo/UserInfo.repository";
import { TReqHdlrRegister } from "~/types/system";
import { SimpleError, HttpStatusCode, generateUser } from "~/utils";

const affectedResource = "Register Middleware";

export const registerHdlr: TReqHdlrRegister = async (req, res, next) => {
  const { clientData } = req.body;

  try {
    const suspect = await uInfoRepo.findOneRecordByEmail(clientData.email);
    if (suspect) {
      return next(
        new SimpleError({
          message: "Email already in used!",
          affectedResource,
          statusCode: HttpStatusCode.BAD_REQUEST
        })
      );
    }
    const [userInfoData, userAccData] = generateUser(clientData);
    await uInfoRepo.createAndSaveOneRecord(userInfoData); // this runs 1st cause FK
    await uAccRepo.createAndSaveOneRecord(userAccData);
    return res.status(HttpStatusCode.CREATED).json({
      message: "UserAccount + UserInfo created!",
      affectedResource,
      statusCode: HttpStatusCode.CREATED
    });
  } catch (err) {
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
// 1. email already existed -> 400 error
// 2. body OK
// 3. external error
