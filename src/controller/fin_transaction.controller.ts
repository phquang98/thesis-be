import { getRepository } from "typeorm";

import { FinTransaction } from "../entity";
import { transactionRequestHandler } from "../util";

// NOTE: WHERE OR -> pass an array or perform a QueryBuilder
export const readBalanceSheetByIndividual: transactionRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;
  console.log("bAccountIDHere", bAccountIDHere);

  try {
    if (bAccountIDHere && bAccountIDHere !== "") {
      const suspectClt = await getRepository(FinTransaction).find({
        where: [{ sender_baccid: bAccountIDHere }, { receiver_baccid: bAccountIDHere }]
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
    console.log("error", error);
    return res.status(400).json({ msg: "Failed to get one 3: bad req", affectedResource: "Transaction" });
  }
};
