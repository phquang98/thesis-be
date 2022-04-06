import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { BankAccount } from "./bank_account.entity";

@Entity("fin_transaction")
export class FinTransaction extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne<BankAccount>(() => BankAccount, (bAccInstnc) => bAccInstnc.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sender_baccid" })
  sender_baccid: string;

  @Column({ name: "receiver_baccid" })
  receiver_baccid: string;

  @Column()
  amount: number;

  @CreateDateColumn({ name: "transacted_at" })
  transacted_at: Date;
}
