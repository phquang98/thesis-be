// import { RequestHandler } from "express";

// import { errorHdlr } from "~/middlewares/errorHandler";

// The idea is that controllers will only return raw dataObj, only here interceptor will take that raw dataObj and do the returning themselves, controllers's jobs are handle logic and RETURN DATA NOT RETURN RES
// export const simpleInterceptor = <T = RequestHandler>(controllerHere: T): RequestHandler => {
//   const interceptingHdlr: RequestHandler = async (interceptingReq, interceptingRes, interceptingNext) => {
//     try {
//       const rawDataObj = await controllerHere(interceptingReq, interceptingRes, interceptingNext);
//       return interceptingRes.status(rawDataObj.statusCode).json(interceptedHdlr);
//     } catch (error) {
//       // error here is from controllers, errorHandler could handle error if error is custom class or a discriminated union
//       next(error);
//       return errorHdlr(error, interceptingReq, interceptingRes, interceptingNext);
//     }
//   };
//   return interceptingHdlr;
// };

// Why: not spamming trycatch block everywhere + put error handling in there
// Explain:
// wrap this outside a business controller
// - if controller succeeded, controllers runs normally
// - if controller failed, error handling in catch block will run
// NOTE: skeleton code, too hard to implement
export {};
