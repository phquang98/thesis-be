// import { RequestHandler } from "express";

// import { errorHdlr } from "~/middlewares/errorHandler";

// export const simpleInterceptor = <T = RequestHandler>(controllerHere: T): RequestHandler => {
//   const interceptingHdlr: RequestHandler = (interceptingReq, interceptingRes, interceptingNext) => {
//     try {
//       const interceptedHdlr = controllerHere(interceptingReq, interceptingRes, interceptingNext);
//       return interceptedHdlr;
//     } catch (error) {
//       return errorHdlr(error, interceptingReq, interceptingRes, interceptingNext);
//     }
//   };
//   return interceptingHdlr;
// };

// // Why: not spamming trycatch block everywhere + put error handling in there
// // Explain:
// // wrap this outside a business controller
// // - if controller succeeded, controllers runs normally
// // - if controller failed, error handling in catch block will run
// NOTE: too hard to implement
export {};
