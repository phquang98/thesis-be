import { uInfoRepo } from "~/resources/UserInfo/UserInfo.repository";
import { TUInfoRequestHandler } from "~/types/business";
import { BaseError, HttpStatusCode } from "~/utils";

export const readUserInfoCtr: TUInfoRequestHandler = async (req, res, _next) => {
  const { userIdHere } = req.params;

  try {
    if (userIdHere) {
      const suspect = await uInfoRepo.findOneRecordById(userIdHere);
      if (suspect) {
        return res.status(HttpStatusCode.OK).json({
          statusCode: HttpStatusCode.OK,
          msg: "Found one!",
          affectedResource: "user_info",
          serverData: suspect
        });
      }
      const customErr = new BaseError({ message: "Khong thay", statusCode: 400 });
      _next(customErr);
    }
  } catch (error) {
    const customErr = new BaseError({ message: "Co van de", statusCode: 400 });
    _next(customErr);
  }
};

export const updateUserInfoCtr: TUInfoRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;
  const { userIdHere } = req.params;

  try {
    if (userIdHere === clientData.id) {
      const suspect = await uInfoRepo.findOneRecordById(userIdHere);
      if (suspect) {
        const queryRes = await uInfoRepo.createAndSaveOneRecord(clientData);
        return res.status(HttpStatusCode.OK).json({
          statusCode: HttpStatusCode.OK,
          msg: "Put one",
          affectedResource: "UserInfo",
          serverData: queryRes
        });
      }
      // return res.status(HTTPStatusCode.NOT_FOUND).json({
      //   statusCode: HTTPStatusCode.NOT_FOUND,
      //   msg: "Put failed 1: not found",
      //   affectedResource: "user_info",
      //   serverData: {}
      // });
    }
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      statusCode: HttpStatusCode.BAD_REQUEST,
      msg: "Put failed 2: req-params And/or req-body missing/malformed or userId mismatched!",
      affectedResource: "UserInfo",
      serverData: {}
    });
  } catch (error) {
    throw new Error("Something wrong!");
  }
};
