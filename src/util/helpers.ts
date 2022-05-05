import { v4 as uuidv4 } from "uuid";

import { TBankAccount, TFinTransaction, TUInfo, TUserAcc } from "../types";

// NOTE: all this helpers are unsafe, make sure what passed in is not falsy

// --- BankAccount Generation ---

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
  const resArr: string[] = [];
  for (let i = 1; i < 9; i++) {
    resArr.push(String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65)));
  }
  return resArr.join("");
};

// --- Transaction Generation ---

// TODO: rewrite this arg -> obj using custom types
export const generateFinTransaction = (
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

// --- UserAccount Generation ---

export const generateUser = (
  dataHere: Pick<TUserAcc, "account_name" | "account_pwd"> & Pick<TUInfo, "name" | "email">
): [TUInfo, TUserAcc] => {
  const tmpOne = generateUserInfo({ name: dataHere.name, email: dataHere.email });
  const tmpTwo = {
    account_name: dataHere.account_name,
    account_pwd: dataHere.account_pwd,
    is_admin: false,
    user_id: tmpOne.id
  };
  return [tmpOne, tmpTwo];
};

// --- UserInfo Generation ---

export const generateUserInfo = (dataHere: Omit<TUInfo, "id">): TUInfo => {
  const tmp = {
    id: uuidv4(),
    name: dataHere.name,
    email: dataHere.email,
    age: dataHere.age ?? undefined,
    address: dataHere.gender ?? undefined,
    pnum: dataHere.pnum ?? undefined
  };
  return tmp;
};
