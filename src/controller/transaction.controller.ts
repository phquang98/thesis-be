import { getRepository } from "typeorm";

import { xRequestHandler } from "../util/index.util";
import { FinTransaction } from "../entity";

export const readCltTransactionBySender: xRequestHandler = async (req, res, _next) => {
  try {
    if ("bAccIDHere" in req.params) {
      const { bAccIDHere } = req.params;
      const suspectClt = await getRepository(FinTransaction).find({ where: { senderBAccID: bAccIDHere } });
      if (suspectClt.length === 0) {
        return res
          .status(404)
          .json({ msg: "Failed to get one 1: not found", affectedResource: "Transaction", serverData: suspectClt });
      }
      return res.status(200).json({ msg: "Got", affectedResource: "Transaction", serverData: suspectClt });
    }
    return res
      .status(400)
      .json({ msg: "Failed to get one 2: params missing or malformed", affectedResource: "Transaction" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to get one 3: bad req", affectedResource: "Transaction" });
  }
};

// TODO: fix this
export const readCltTransactionByReceiver: xRequestHandler = async (req, res, _next) => {
  try {
    if ("bAccIDHere" in req.params) {
      const { bAccIDHere } = req.params;
      const suspectClt = await getRepository(FinTransaction).find({ where: { receiverBAccID: bAccIDHere } });
      if (suspectClt.length === 0) {
        return res
          .status(404)
          .json({ msg: "Failed to get one 1: not found", affectedResource: "Transaction", serverData: suspectClt });
      }
      return res.status(200).json({ msg: "Got", affectedResource: "Transaction", serverData: suspectClt });
    }
    return res
      .status(400)
      .json({ msg: "Failed to get one 2: params missing or malformed", affectedResource: "Transaction" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to get one 3: bad req", affectedResource: "Transaction" });
  }
};
