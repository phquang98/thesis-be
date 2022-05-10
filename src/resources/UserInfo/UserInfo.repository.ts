import { appDataSource } from "~/config/dataSource";

import { UserInfo } from "~/resources/UserInfo/UserInfo.entity";
import { TUInfo } from "~/types/business";

const uInfoTypeORMRepo = appDataSource.getRepository(UserInfo);

const findOneRecordById = async (userIdHere: string): Promise<UserInfo | null> => {
  return await uInfoTypeORMRepo.findOne({ where: { id: userIdHere } });
};

const findOneRecordByEmail = async (userEmailHere: string): Promise<UserInfo | null> => {
  return await uInfoTypeORMRepo.findOne({ where: { email: userEmailHere } });
};

const createAndSaveOneRecord = async (uInfoData: TUInfo): Promise<UserInfo> => {
  const tmpInstance = uInfoTypeORMRepo.create(uInfoData);
  return await uInfoTypeORMRepo.save(tmpInstance);
};

export const uInfoRepo = {
  findOneRecordById,
  findOneRecordByEmail,
  createAndSaveOneRecord
};

// why return await: benefits stack trace ?
