import { appDataSource } from "~/config/dataSrc";

import { UserInfo } from "~/resources/UserInfo/UserInfo.entity";
import { TUInfo } from "~/types/business";

const uInfoTypeORMRepo = appDataSource.getRepository(UserInfo);

const findOneRecord = async (userIdHere: string): Promise<UserInfo | null> => {
  return await uInfoTypeORMRepo.findOne({ where: { id: userIdHere } });
};

const createOrSaveOneRecord = async (uInfoData: TUInfo): Promise<UserInfo | null> => {
  const tmpInstance = uInfoTypeORMRepo.create(uInfoData);
  return await uInfoTypeORMRepo.save(tmpInstance);
};

export const uInfoRepo = {
  findOneRecord,
  createOrSaveOneRecord
};

// why return await: benefits stack trace ?
