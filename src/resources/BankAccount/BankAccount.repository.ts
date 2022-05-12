import { appDataSource } from "~/config/dataSource";
import { BankAccount } from "~/resources/BankAccount/BankAccount.entity";
import { TBAcc } from "~/types/business";
import { generateBankAccountData } from "~/utils";

const bAccTypeORMRepo = appDataSource.getRepository(BankAccount);

const findOneRecordByUserId = async (userIdHere: string): Promise<BankAccount | null> => {
  return await bAccTypeORMRepo.findOne({ where: { userId: userIdHere } });
};

const findOneRecordById = async (bAccIdHere: string): Promise<BankAccount | null> => {
  return await bAccTypeORMRepo.findOne({ where: { id: bAccIdHere } });
};

const createAndSaveOneRecord = async (userIdHere: string): Promise<BankAccount> => {
  const bAccData = generateBankAccountData(userIdHere);
  const tmpInstance = bAccTypeORMRepo.create(bAccData);
  return await bAccTypeORMRepo.save(tmpInstance);
};

const deleteOneRecord = async (bAccRecordHere: BankAccount): Promise<BankAccount> => {
  return await bAccTypeORMRepo.remove(bAccRecordHere);
};

// TODO: maybe put this somewhere else
const simplePopulate = async (): Promise<BankAccount[]> => {
  const workData: Omit<TBAcc, "createdAt"> = {
    id: "1",
    iban: "1111 1111 1111 1111 11",
    swiftBIC: "BAK11111",
    balance: 999999999, // smaller than 2147483647 - PostgreSQL integer,
    userId: "1"
  };
  const spendData: Omit<TBAcc, "createdAt"> = {
    id: "2",
    iban: "2222 2222 2222 2222 22",
    swiftBIC: "BAK22222",
    balance: 0, // smaller than 2147483647 - PostgreSQL integer,
    userId: "2"
  };

  const workBAcc = await bAccTypeORMRepo.save(bAccTypeORMRepo.create(workData));
  const spendBAcc = await bAccTypeORMRepo.save(bAccTypeORMRepo.create(spendData));
  return [workBAcc, spendBAcc];
};

export const bAccRepo = {
  findOneRecordByUserId,
  findOneRecordById,
  createAndSaveOneRecord,
  deleteOneRecord,
  simplePopulate
};

// why return await: benefits stack trace ?
