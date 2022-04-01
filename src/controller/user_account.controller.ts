import { getRepository } from "typeorm";

import { UserAccount, UserInfo } from "../entity";
import { generateUser, uAccRequestHandler } from "../util";

// TODO: finish this
export const createUAcc: uAccRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;

  try {
    const suspect = await getRepository(UserInfo).findOne({ email: clientData.email });
    if (suspect) {
      return res.status(400).json({ msg: "Email already in used!", affectedResource: "UserAccount, UserInfo" });
    }
    const [userInfoData, userAccData] = generateUser(clientData);
    const tmpInstncUInfo = getRepository(UserInfo).create(userInfoData);
    const tmpInstncUAcc = getRepository(UserAccount).create(userAccData);
    await getRepository(UserInfo).save(tmpInstncUInfo);
    await getRepository(UserAccount).save(tmpInstncUAcc);
    return res
      .status(201)
      .json({ msg: "success, will be redirect to main page", affectedResource: "UserAccount, UserInfo" });
  } catch (error) {
    return res.status(400).json({ msg: "bad req", affectedResource: "UserAccount" });
  }
};
