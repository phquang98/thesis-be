import { uInfoRepo } from "~/resources/UserInfo/UserInfo.repository";

import { TUInfoRequestHandler } from "~/types/business";
import { HttpStatusCode } from "~/utils";

export const readUserInfoCtr: TUInfoRequestHandler = async (req, res, _next) => {
  const { userIdHere } = req.params;

  if (userIdHere) {
    const suspect = await uInfoRepo.findOneRecord(userIdHere);
    if (suspect) {
      return res
        .status(HttpStatusCode.OK)
        .json({ statusCode: HttpStatusCode.OK, msg: "Found one!", affectedResource: "user_info", serverData: suspect });
    }
    throw new Error("Something wrong!");
  }
};
