import { BaseEntity, EntityTarget, FindConditions, getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { TBankAccount } from "./index.util";

export const xFindOneResource = async <E extends BaseEntity>(
  entityClassHere: EntityTarget<E>,
  findConditionsHere: FindConditions<E>
): Promise<E | undefined> => {
  const asd = await getRepository(entityClassHere).findOne(findConditionsHere);
  return asd;
};

export const generateBankAccountData = (customerIDHere: string): Omit<TBankAccount, "createdAt"> => {
  const tmp: Omit<TBankAccount, "createdAt"> = {
    id: uuidv4(),
    iban: generateRandomIBAN(),
    swift_bic: generateSWIFTCode(),
    balance: 0,
    customerID: customerIDHere
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
