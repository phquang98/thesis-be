import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { BankAccount } from "./bankaccount.entity";

@Entity("fin_transaction")
export class FinTransaction extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne<BankAccount>(() => BankAccount, (bAccInstnc) => bAccInstnc.id)
  @JoinColumn({ name: "senderBAccID" })
  senderBAccID: string;

  @Column()
  receiverBAccID: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  transactedAt: Date;
}
