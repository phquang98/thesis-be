// import { bAccRepo } from "~/resources/BankAccount/BankAccount.repository";
// import { TBAccRequestHandler } from "~/types/business";
// import { SimpleError, HttpStatusCode } from "~/utils";

// const affectedResource = "BankAccount";

// // FE -> userId -> find UserInfo
// export const readBAccCtr: TBAccRequestHandler = async (req, res, next) => {
//   const { bAccIdHere } = req.params;

//   try {
//     if (bAccIdHere) {
//       const suspect = await bAccRepo.findOneRecordById(bAccIdHere);
//       if (suspect) {
//         return res.status(HttpStatusCode.OK).json({
//           message: "Found one!",
//           affectedResource,
//           statusCode: HttpStatusCode.OK,
//           serverData: suspect
//         });
//       }
//       const errCtx = new SimpleError({
//         message: "Failed get 1: Can't found record in DB based on provided id!",
//         affectedResource,
//         statusCode: HttpStatusCode.NOT_FOUND
//       });
//       return next(errCtx);
//     }
//     const errCtx = new SimpleError({
//       message: "Failed get 2: User ID is missing in path variables!",
//       affectedResource,
//       statusCode: HttpStatusCode.BAD_REQUEST
//     });
//     return next(errCtx);
//   } catch (error) {
//     const errCtx = new SimpleError({
//       message: "Failed get 3: Something wrong!",
//       affectedResource,
//       statusCode: HttpStatusCode.BAD_REQUEST
//     });
//     return next(errCtx);
//   }
// };

// // FE -> userId + req.body -> find -> OK -> save
// export const updateUserInfoCtr: TUInfoRequestHandler = async (req, res, next) => {
//   const { clientData } = req.body;
//   const { userIdHere } = req.params;

//   try {
//     if (userIdHere === clientData.id) {
//       const suspect = await uInfoRepo.findOneRecordById(userIdHere);
//       if (suspect) {
//         const queryRes = await uInfoRepo.createAndSaveOneRecord(clientData);
//         return res.status(HttpStatusCode.OK).json({
//           message: "Put one",
//           affectedResource,
//           statusCode: HttpStatusCode.OK,
//           serverData: queryRes
//         });
//       }
//       const errCtx = new SimpleError({
//         message: "Failed update 1: Can't found record in DB based on provided id!",
//         affectedResource,
//         statusCode: HttpStatusCode.BAD_REQUEST
//       });
//       return next(errCtx);
//     }
//     const errCtx = new SimpleError({
//       message: "Failed update 2: Data in path variables and request body is mismatch or missing!",
//       affectedResource,
//       statusCode: HttpStatusCode.BAD_REQUEST
//     });
//     return next(errCtx);
//   } catch (error) {
//     const errCtx = new SimpleError({
//       message: "Failed update 3: Something wrong!",
//       affectedResource,
//       statusCode: HttpStatusCode.BAD_REQUEST
//     });
//     return next(errCtx);
//   }
// };
