import { getRepository } from "typeorm";

import { BankAccount } from "../entity";
import { TBAccRequestHandler, TBankAccount } from "../types";
import { generateBankAccountData, HTTPStatusCode } from "../util";

export const createBAccount: TBAccRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;

  try {
    if (clientData && "customer_id" in clientData) {
      const suspect = await getRepository(BankAccount).findOne({ customer_id: clientData.customer_id });
      if (suspect) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          statusCode: HTTPStatusCode.BAD_REQUEST,
          msg: "Failed to create 1: atm cant only have 1 account",
          affectedResource: "BankAccount",
          serverData: {}
        });
      }
      const tmpData = generateBankAccountData(clientData.customer_id);
      const tmpInstnc = getRepository(BankAccount).create(tmpData);
      const queryResult = await getRepository(BankAccount).save(tmpInstnc);
      return res.status(HTTPStatusCode.CREATED).json({
        statusCode: HTTPStatusCode.CREATED,
        msg: "Created",
        affectedResource: "BankAccount",
        serverData: queryResult
      });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to create 2: req body missing/malformed",
      affectedResource: "BankAccount",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to create 3: bad req",
      affectedResource: "BankAccount",
      serverData: {}
    });
  }
};

export const readBAccount: TBAccRequestHandler = async (req, res, _next) => {
  const { bAccIdHere } = req.params;

  try {
    if (bAccIdHere && bAccIdHere !== "") {
      const suspect = await getRepository(BankAccount).findOne({ id: bAccIdHere });
      return suspect
        ? res.status(HTTPStatusCode.OK).json({
            statusCode: HTTPStatusCode.OK,
            msg: "Got one",
            affectedResource: "BankAccount",
            serverData: suspect
          })
        : res.status(HTTPStatusCode.NOT_FOUND).json({
            statusCode: HTTPStatusCode.NOT_FOUND,
            msg: "Failed to get one 1: not found",
            affectedResource: "BankAccount",
            serverData: {}
          });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to get 2: params missing/malformed",
      affectedResource: "BankAccount",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to get 3: bad req",
      affectedResource: "BankAccount",
      serverData: {}
    });
  }
};

export const deleteBAccount: TBAccRequestHandler = async (req, res, _next) => {
  const { bAccIdHere } = req.params;

  try {
    if (bAccIdHere && bAccIdHere !== "") {
      const suspect = await getRepository(BankAccount).findOne({ id: bAccIdHere });

      if (suspect) {
        const queryResult = await getRepository(BankAccount).remove(suspect); // queryResult miss id prop
        return res.status(HTTPStatusCode.OK).json({
          statusCode: HTTPStatusCode.OK,
          msg: "Deleted one",
          affectedResource: "BankAccount",
          serverData: queryResult
        });
      }
      return res.status(HTTPStatusCode.NOT_FOUND).json({
        statusCode: HTTPStatusCode.NOT_FOUND,
        msg: "Failed to deleted 1: not found",
        affectedResource: "BankAccount",
        serverData: {}
      });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to delete 2: path params missing or malformed",
      affectedResource: "BankAccount",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to delete 3: bad req",
      affectedResource: "BankAccount",
      serverData: {}
    });
  }
};

// --- Admin BAcc ---

export const populateDB: TBAccRequestHandler = async (req, res, _next) => {
  const workData: Omit<TBankAccount, "created_at"> = {
    id: "1",
    iban: "1111 1111 1111 1111 11",
    swift_bic: "BAK11111",
    balance: 999999999, // smaller than 2147483647 - PostgreSQL integer,
    customer_id: "1"
  };

  const spendData: Omit<TBankAccount, "created_at"> = {
    id: "2",
    iban: "2222 2222 2222 2222 22",
    swift_bic: "BAK22222",
    balance: 0, // smaller than 2147483647 - PostgreSQL integer,
    customer_id: "1"
  };

  try {
    const workBAcc = getRepository(BankAccount).create(workData);
    const spendBAcc = getRepository(BankAccount).create(spendData);
    await getRepository(BankAccount).save(workBAcc);
    await getRepository(BankAccount).save(spendBAcc);
    return res.status(HTTPStatusCode.CREATED).json({
      statusCode: HTTPStatusCode.CREATED,
      msg: "Created workBAcc and spendBAcc!",
      affectedResource: "BankAccount",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to create: bad req",
      affectedResource: "BankAccount",
      serverData: {}
    });
  }
};
