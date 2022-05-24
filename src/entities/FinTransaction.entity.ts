import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("fin_transaction")
export class FinTransaction extends BaseEntity {
  @PrimaryColumn()
  id: string;

  // @ManyToOne<BankAccount>(() => BankAccount, (bAccInstnc) => bAccInstnc.id, { onDelete: "CASCADE" })
  // @JoinColumn({ name: "sender_baccid" })
  @Column({ name: "sender_baccid" })
  senderBAccId: string;

  @Column({ name: "receiver_baccid" })
  receiverBAccId: string;

  @Column()
  amount: number;

  @CreateDateColumn({ name: "transacted_at" })
  transactedAt: Date;
}
