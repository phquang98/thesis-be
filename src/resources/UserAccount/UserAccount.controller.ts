// import { getRepository } from "typeorm";

// import { UserInfo } from "~/resources/UserInfo/UserInfo.entity";
// import { UserAccount } from "~/resources/UserAccount/UserAccount.entity";
// import { generateUser, HTTPStatusCode } from "../util";
// import { TUAccController } from "../types";

// export const createUAcc: TUAccController = async (req, res, _next) => {
//   const { clientData } = req.body;

//   try {
//     const suspect = await getRepository(UserInfo).findOne({ email: clientData.email });
//     if (suspect) {
//       return res.status(HTTPStatusCode.BAD_REQUEST).json({
//         statusCode: HTTPStatusCode.BAD_REQUEST,

//         msg: "Email already in used!",
//         affectedResource: "UserAccount, UserInfo",
//         serverData: {}
//       });
//     }
//     const [userInfoData, userAccData] = generateUser(clientData);
//     const tmpInstncUAcc = getRepository(UserAccount).create(userAccData);
//     const tmpInstncUInfo = getRepository(UserInfo).create(userInfoData);
//     await getRepository(UserInfo).save(tmpInstncUInfo);
//     await getRepository(UserAccount).save(tmpInstncUAcc);
//     return res.status(HTTPStatusCode.CREATED).json({
//       statusCode: HTTPStatusCode.CREATED,
//       msg: "User account created.",
//       affectedResource: "UserAccount, UserInfo",
//       serverData: {}
//     });
//   } catch (error) {
//     return res.status(HTTPStatusCode.BAD_REQUEST).json({
//       statusCode: HTTPStatusCode.BAD_REQUEST,
//       msg: "Bad request!",
//       affectedResource: "UserAccount",
//       serverData: {}
//     });
//   }
// };

// // export const deleteUAcc: TUAccController = async (req, res, next) => {};

// // export const changePwd: TUAccController = async (req, res, next) => {};
export {};
