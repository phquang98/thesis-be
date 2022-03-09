import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, ManyToOne } from "typeorm";

import { BankAccount } from "./bankaccount.entity";

@Entity("transaction")
export class FinTransaction extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => BankAccount, (bAccInstnc: BankAccount) => bAccInstnc.id)
  senderBAccID: string;

  @Column()
  receiverBAccID: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  transactedAt: Date;
}
