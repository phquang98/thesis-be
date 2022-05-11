import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("bank_account")
export class BankAccount extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  iban: string;

  @Column({ name: "swift_bic" })
  swiftBIC: string;

  @Column()
  balance: number;

  // TODO: change this to 1TM-MT1
  @Column({ name: "user_id" })
  userId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
