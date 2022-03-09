import { getRepository } from "typeorm";

import { xRequestHandler } from "../util/index.util";
import { BankAccount } from "../entity/bankaccount.entity";

export const deleteBankAccount: xRequestHandler = async (req, res, _next) => {
  try {
    if ("bAccountIDHere" in req.params) {
      const { bAccountIDHere } = req.params;
      const suspect = await getRepository(BankAccount).findOne({ id: bAccountIDHere });

      if (suspect) {
        const queryResult = await getRepository(BankAccount).remove(suspect); // queryResult miss id prop
        return res.status(200).json({ msg: "Deleted one", affectedResource: "BankAccount", serverData: queryResult });
      }
      return res.status(404).json({ msg: "Failed to deleted 1: not found", affectedResource: "BankAccount" });
    }
    return res
      .status(400)
      .json({ msg: "Failed to delete 2: path params missing or malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to get: bad req", affectedResource: "BankAccount" });
  }
};
