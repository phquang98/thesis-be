import { getRepository } from "typeorm";

import { transactionRequestHandler } from "../util/index.util";
import { FinTransaction } from "../entity";

export const readCltTransactionByIndividual: transactionRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;

  try {
    if (bAccountIDHere && bAccountIDHere !== "") {
      const suspectClt = await getRepository(FinTransaction).find({
        where: { senderBAccID: bAccountIDHere }
      });
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
