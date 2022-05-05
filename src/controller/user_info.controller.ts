import { getRepository } from "typeorm";

import { UserInfo } from "../entity";
import { TUInfoRequestHandler } from "../types";
import { generateUserInfo, HTTPStatusCode } from "../util";

export const createUInfo: TUInfoRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;

  try {
    if (clientData && "email" in clientData) {
      const suspect = await getRepository(UserInfo).findOne({ email: clientData.email });
      if (suspect) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          statusCode: HTTPStatusCode.BAD_REQUEST,
          msg: "Create failed 1: email already used",
          affectedResource: "user_info",
          serverData: {}
        });
      }
      const tmpData = generateUserInfo(clientData);
      const tmpInstnc = getRepository(UserInfo).create(tmpData);
      const queryResult = await getRepository(UserInfo).save(tmpInstnc);
      return res.status(HTTPStatusCode.CREATED).json({
        statusCode: HTTPStatusCode.CREATED,

        msg: "Created",
        affectedResource: "user_info",
        serverData: queryResult
      });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Create failed 2: req-body missing/malformed",
      affectedResource: "user_info",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,

      msg: "Create failed 3: bad req",
      affectedResource: "user_info",
      serverData: {}
    });
  }
};

export const readUInfo: TUInfoRequestHandler = async (req, res, _next) => {
  const { userIdHere } = req.params;

  try {
    if (userIdHere) {
      const suspect = await getRepository(UserInfo).findOne({ id: userIdHere });
      return suspect
        ? res.status(HTTPStatusCode.OK).json({
            statusCode: HTTPStatusCode.OK,
            msg: "Got one",
            affectedResource: "UserInfo",
            serverData: suspect
          })
        : res.status(HTTPStatusCode.NOT_FOUND).json({
            statusCode: HTTPStatusCode.NOT_FOUND,
            msg: "Get failed 1: not found",
            affectedResource: "UserInfo",
            serverData: {}
          });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Get failed 2: req-params missing/malformed",
      affectedResource: "UserInfo",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Get failed 3: bad req",
      affectedResource: "UserInfo",
      serverData: {}
    });
  }
};

export const updateUInfo: TUInfoRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;
  const { userIdHere } = req.params;

  try {
    if (userIdHere && clientData && "email" in clientData) {
      const suspect = await getRepository(UserInfo).findOne({ id: userIdHere });
      if (suspect && suspect.id === clientData.id) {
        const queryRes = await getRepository(UserInfo).save(clientData);
        return res.status(HTTPStatusCode.OK).json({
          statusCode: HTTPStatusCode.OK,
          msg: "Put one",
          affectedResource: "user_info",
          serverData: queryRes
        });
      }
      return res.status(HTTPStatusCode.NOT_FOUND).json({
        statusCode: HTTPStatusCode.NOT_FOUND,
        msg: "Put failed 1: not found",
        affectedResource: "user_info",
        serverData: {}
      });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Put failed 2: req-params And/or req-body missing/malformed",
      affectedResource: "user_info",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Put failed 3: bad req",
      affectedResource: "user_info",
      serverData: {}
    });
  }
};
