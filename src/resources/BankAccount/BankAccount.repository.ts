import { appDataSource } from "~/config/dataSource";

import { BankAccount } from "~/resources/BankAccount/BankAccount.entity";
import { TBAcc } from "~/types/business";
import { generateBankAccountData } from "~/utils";

const bAccTypeORMRepo = appDataSource.getRepository(BankAccount);

const findOneRecordByUserId = async (userIdHere: string): Promise<TBAcc | null> => {
  return await bAccTypeORMRepo.findOne({ where: { userId: userIdHere } });
};

const findOneRecordById = async (bAccIdHere: string): Promise<TBAcc | null> => {
  return await bAccTypeORMRepo.findOne({ where: { id: bAccIdHere } });
};

const createAndSaveOneRecord = async (userIdHere: string): Promise<TBAcc> => {
  const bAccData = generateBankAccountData(userIdHere);
  const tmpInstance = bAccTypeORMRepo.create(bAccData);
  return await bAccTypeORMRepo.save(tmpInstance);
};

export const bAccRepo = {
  findOneRecordByUserId,
  findOneRecordById,
  createAndSaveOneRecord
};

// why return await: benefits stack trace ?
