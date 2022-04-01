import { getRepository } from "typeorm";

import { UserInfo } from "../entity";
import { generateUserInfo, uInfoRequestHandler } from "../util";

export const createUInfo: uInfoRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;
  console.log("req body", req.body);

  try {
    if (clientData && "email" in clientData) {
      const suspect = await getRepository(UserInfo).findOne({ email: clientData.email });
      if (suspect) {
        return res.status(400).json({ msg: "Create failed 1: email already used", affectedResource: "user_info" });
      }
      const tmpData = generateUserInfo(clientData);
      const tmpInstnc = getRepository(UserInfo).create(tmpData);
      const queryResult = await getRepository(UserInfo).save(tmpInstnc);
      return res.status(201).json({ msg: "Created", affectedResource: "user_info", serverData: queryResult });
    }
    return res.status(400).json({ msg: "Create failed 2: req-body missing/malformed", affectedResource: "user_info" });
  } catch (error) {
    return res.status(400).json({ msg: "Create failed 3: bad req", affectedResource: "user_info" });
  }
};

export const readUInfo: uInfoRequestHandler = async (req, res, _next) => {
  const { userIDHere } = req.params;

  try {
    if (userIDHere && userIDHere !== "") {
      const suspect = await getRepository(UserInfo).findOne({ id: userIDHere });
      return suspect
        ? res.status(200).json({ msg: "Got one", affectedResource: "user_info", serverData: suspect })
        : res.status(404).json({ msg: "Get failed 1: not found", affectedResource: "user_info" });
    }
    return res.status(400).json({ msg: "Get failed 2: req-params missing/malformed", affectedResource: "user_info" });
  } catch (error) {
    return res.status(400).json({ msg: "Get failed 3: bad req", affectedResource: "user_info" });
  }
};

export const updateUInfo: uInfoRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;
  const { userIDHere } = req.params;

  try {
    if (userIDHere && clientData && "email" in clientData) {
      const suspect = await getRepository(UserInfo).findOne({ id: userIDHere });
      if (suspect && suspect.id === clientData.id) {
        const queryRes = await getRepository(UserInfo).save(clientData);
        return res.status(200).json({ msg: "Put one", affectedResource: "user_info", serverData: queryRes });
      }
      return res.status(404).json({ msg: "Put failed 1: not found", affectedResource: "user_info" });
    }
    return res
      .status(400)
      .json({ msg: "Put failed 2: req-params And/or req-body missing/malformed", affectedResource: "user_info" });
  } catch (error) {
    return res.status(400).json({ msg: "Put failed 3: bad req", affectedResource: "user_info" });
  }
};
