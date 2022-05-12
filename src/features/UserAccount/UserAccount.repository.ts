import { appDataSource } from "~/config/dataSource";
import { UserAccount } from "~/entities";
import { TUAcc } from "~/types/business";

const uAccTypeORMRepo = appDataSource.getRepository(UserAccount);

// expect used in future, no use atm
const findOneRecordById = async (userIdHere: string): Promise<UserAccount | null> => {
  return await uAccTypeORMRepo.findOne({ where: { user_id: userIdHere } });
};

// used in login
const findOneRecordByAccountName = async (userAccNameHere: string): Promise<UserAccount | null> => {
  return await uAccTypeORMRepo.findOne({ where: { accountName: userAccNameHere } });
};

// used in /register
const createAndSaveOneRecord = async (userAccData: TUAcc): Promise<UserAccount> => {
  const tmpInstance = uAccTypeORMRepo.create(userAccData);
  return await uAccTypeORMRepo.save(tmpInstance);
};

export const uAccRepo = {
  findOneRecordById,
  findOneRecordByAccountName,
  createAndSaveOneRecord
};
