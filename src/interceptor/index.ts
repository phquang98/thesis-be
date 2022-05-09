// import { RequestHandler } from "express";

// export const simpleInterceptor = (controllerHere: RequestHandler): RequestHandler => {
//   const interceptingHdlr: RequestHandler = (interceptingReq, interceptingRes, interceptingNext) => {
//     try {
//       const interceptedHdlr = controllerHere(interceptingReq, interceptingRes, interceptingNext);
//       return interceptedHdlr;
//     } catch (error) {
//       return interceptingRes.status(400).json({ msg: "Something wrong!" });
//     }
//   };
//   return interceptingHdlr;
// };

// // Why: not spamming trycatch block everywhere + put error handling in there
// // Explain:
// // wrap this outside a business controller
// // - if controller succeeded, controllers runs normally
// // - if controller failed, error handling in catch block will run
// TODO: fix this
export {};
