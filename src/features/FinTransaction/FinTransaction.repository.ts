import { appDataSource } from "~/config/dataSource";
import { FinTransaction } from "~/entities";
import { TFinTransaction } from "~/types/business";
import { generateFinTransaction } from "~/utils";

const finTransactTypeORMRepo = appDataSource.getRepository(FinTransaction);

const findOneRecordById = async (finTransactIdHere: string): Promise<FinTransaction | null> => {
  return await finTransactTypeORMRepo.findOneBy({ id: finTransactIdHere });
};

// NOTE: redundant ?
const findOneRecordBySender = async (senderBAccIdHere: string): Promise<FinTransaction | null> => {
  return await finTransactTypeORMRepo.findOneBy({ senderBAccId: senderBAccIdHere });
};

const findAllRecordsBySender = async (senderBAccIdHere: string): Promise<FinTransaction[]> => {
  return await finTransactTypeORMRepo.findBy({ senderBAccId: senderBAccIdHere });
};

// NOTE: redundant ?
const findOneRecordByReceiver = async (receiverBAccIdHere: string): Promise<FinTransaction | null> => {
  return await finTransactTypeORMRepo.findOneBy({ receiverBAccId: receiverBAccIdHere });
};

const findAllRecordsByReceiver = async (receiverBAccIdHere: string): Promise<FinTransaction[]> => {
  return await finTransactTypeORMRepo.findBy({ receiverBAccId: receiverBAccIdHere });
};

const createAndSaveOneRecord = async (
  partialData: Pick<TFinTransaction, "amount" | "receiverBAccId" | "senderBAccId">
): Promise<FinTransaction> => {
  const data = generateFinTransaction(partialData.amount, partialData.receiverBAccId, partialData.senderBAccId);
  const tmpInstance = finTransactTypeORMRepo.create(data);
  return await finTransactTypeORMRepo.save(tmpInstance);
};

export const finTransactRepo = {
  findOneRecordById,
  findOneRecordBySender,
  findAllRecordsBySender,
  findOneRecordByReceiver,
  findAllRecordsByReceiver,
  createAndSaveOneRecord
};

// why return await: benefits stack trace ?
