import { getRepository } from "typeorm";

import { BankAccount, FinTransaction } from "../entity";
import { TBankAccount, bAccRequestHandler, generateBankAccountData, generateOneTransactionData } from "../util";

export const createBAccount: bAccRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;

  try {
    if (clientData && "customer_id" in clientData) {
      const suspect = await getRepository(BankAccount).findOne({ customer_id: clientData.customer_id });
      if (suspect) {
        return res
          .status(400)
          .json({ msg: "Failed to create 1: atm cant only have 1 account", affectedResource: "BankAccount" });
      }
      const tmpData = generateBankAccountData(clientData.customer_id);
      const tmpInstnc = getRepository(BankAccount).create(tmpData);
      const queryResult = await getRepository(BankAccount).save(tmpInstnc);
      return res.status(201).json({ msg: "Created", affectedResource: "BankAccount", serverData: queryResult });
    }
    return res
      .status(400)
      .json({ msg: "Failed to create 2: req body missing/malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to create 3: bad req", affectedResource: "BankAccount" });
  }
};

export const readBAccount: bAccRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;

  try {
    if (bAccountIDHere && bAccountIDHere !== "") {
      const suspect = await getRepository(BankAccount).findOne({ id: bAccountIDHere });
      return suspect
        ? res.status(200).json({ msg: "Got one", affectedResource: "BankAccount", serverData: suspect })
        : res.status(404).json({ msg: "Failed to get one 1: not found", affectedResource: "BankAccount" });
    }
    return res.status(400).json({ msg: "Failed to get 2: params missing/malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to get 3: bad req", affectedResource: "BankAccount" });
  }
};

export const deleteBAccount: bAccRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;

  try {
    if (bAccountIDHere && bAccountIDHere !== "") {
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
    return res.status(400).json({ msg: "Failed to delete 3: bad req", affectedResource: "BankAccount" });
  }
};

export const generateOneTransaction: bAccRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;

  try {
    if ("sender_baccid" in clientData && req.params.bAccountIDHere === clientData.sender_baccid) {
      const { sender_baccid, receiver_baccid, amount } = clientData;

      const senderDeduct = await getRepository(BankAccount).findOne({ id: sender_baccid });
      const receiverAdd = await getRepository(BankAccount).findOne({ id: receiver_baccid });
      if (senderDeduct && receiverAdd && senderDeduct.balance >= amount) {
        const tmpData = generateOneTransactionData(sender_baccid, receiver_baccid, amount);
        const tmpInstnc = getRepository(FinTransaction).create(tmpData);

        const queryResult = await getRepository(BankAccount).save({
          ...senderDeduct,
          balance: senderDeduct.balance - amount
        });
        await getRepository(BankAccount).save({ ...receiverAdd, balance: receiverAdd.balance + amount });
        await getRepository(FinTransaction).save(tmpInstnc);

        return res
          .status(201)
          .json({ msg: "Posted!", affectedResource: "BankAccount, Transaction", serverData: queryResult });
      }
      return res.status(400).json({
        msg: "Failed to post 1: balance not enough or sender/receiver not existed",
        affectedResource: "BankAccount, Transaction"
      });
    }
    return res.status(400).json({
      msg: "Failed to post 2: params or body missing or malformed",
      affectedResource: "BankAccount, Transaction"
    });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to post 3: bad req", affectedResource: "BankAccount, Transaction" });
  }
};

export const simulateSalaryEarning: bAccRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;
  const { clientData } = req.body;

  try {
    if (bAccountIDHere && "amount" in clientData) {
      const { amount } = clientData;

      const suspect = await getRepository(BankAccount).findOne({ id: bAccountIDHere });

      if (suspect) {
        const tmpTransactData = generateOneTransactionData("1", bAccountIDHere, amount);
        const tmpTransact = getRepository(FinTransaction).create(tmpTransactData);
        await getRepository(FinTransaction).save(tmpTransact);
        const queryRes = await getRepository(BankAccount).save({ ...suspect, balance: suspect.balance + amount });

        return res.status(200).json({
          msg: "Money has been deposited!",
          affectedResource: "BankAccount, Transaction",
          serverData: queryRes
        });
      }
      return res.status(404).json({ msg: "Failed to post 1: not found", affectedResource: "BankAccount" });
    }
    return res
      .status(400)
      .json({ msg: "Failed to post 2: params and body missing or malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to post 3: bad req", affectedResource: "BankAccount" });
  }
};

// --- Admin BAcc ---

export const populateDB: bAccRequestHandler = async (req, res, _next) => {
  const workData: Omit<TBankAccount, "created_at"> = {
    id: "1",
    iban: "1111 1111 1111 1111 11",
    swift_bic: "FIN11111",
    balance: 999999999, // smaller than 2147483647 - PostgreSQL integer,
    customer_id: "1"
  };

  const spendData: Omit<TBankAccount, "created_at"> = {
    id: "2",
    iban: "2222 2222 2222 2222 22",
    swift_bic: "FIN22222",
    balance: 0, // smaller than 2147483647 - PostgreSQL integer,
    customer_id: "1"
  };

  try {
    const workBAcc = getRepository(BankAccount).create(workData);
    const spendBAcc = getRepository(BankAccount).create(spendData);
    await getRepository(BankAccount).save(workBAcc);
    await getRepository(BankAccount).save(spendBAcc);
    return res.status(201).json({ msg: "Created workBAcc and spendBAcc!", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to create: bad req", affectedResource: "BankAccount" });
  }
};
