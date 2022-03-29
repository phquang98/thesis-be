import { BaseEntity, EntityTarget, FindConditions, getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { TBankAccount, TFinTransaction, TUInfo } from "./types.util";

export const xFindOneResource = async <E extends BaseEntity>(
  entityClassHere: EntityTarget<E>,
  findConditionsHere: FindConditions<E>
): Promise<E | undefined> => {
  const asd = await getRepository(entityClassHere).findOne(findConditionsHere);
  return asd;
};

// --- BankAccount Helpers ---

export const generateBankAccountData = (customerIDHere: string): Omit<TBankAccount, "created_at"> => {
  const tmp: Omit<TBankAccount, "created_at"> = {
    id: uuidv4(),
    iban: generateRandomIBAN(),
    swift_bic: generateSWIFTCode(),
    balance: 0,
    customer_id: customerIDHere
  };

  return tmp;
};

const generateRandomIBAN = (): string => {
  const tmp1 = String.fromCharCode(
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65)
  );
  let tmp2 = "";
  while (tmp2.length < 16) {
    tmp2 += Math.floor(Math.random() * (9 - 0) + 0);
  }
  const dirtyRes = tmp1.concat(tmp2);
  const res: string[] = [];
  dirtyRes.split("").forEach((ele, index) => {
    if (index % 4 === 0 && index !== 0) {
      res.push(" ");
    }
    res.push(ele);
  });
  return res.join("");
};

const generateSWIFTCode = (): string => {
  return String.fromCharCode(
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65),
    Math.floor(Math.random() * (90 - 65) + 65)
  );
};

// --- Transaction Helpers ---

export const generateOneTransactionData = (
  senderIDHere: string,
  receiverIDHere: string,
  amount: number
): Omit<TFinTransaction, "transacted_at"> => {
  const tmp: Omit<TFinTransaction, "transacted_at"> = {
    id: uuidv4(),
    sender_baccid: senderIDHere,
    receiver_baccid: receiverIDHere,
    amount
  };
  return tmp;
};

// --- Resource Generation ---

type TExpectedData = Omit<TUInfo, "id"> | Pick<TFinTransaction, "sender_baccid" | "receiver_baccid" | "amount">;

type TSingleResource = TUInfo | Record<string, never>;

export const generateOneResource = (dataHere: TExpectedData): TSingleResource => {
  let tmp: TSingleResource = {};

  if ("email" in dataHere) {
    tmp = {
      id: uuidv4(),
      name: dataHere.name,
      email: dataHere.email,
      age: dataHere.age ?? undefined,
      address: dataHere.gender ?? undefined,
      pnum: dataHere.pnum ?? undefined
    };
    return tmp;
  }
  return tmp;
};
