import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("bank_account")
export class BankAccount extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  iban: string;

  @Column()
  swift_bic: string;

  @Column()
  balance: number;

  // TODO: change this to 1TM-MT1
  @Column({ name: "customer_id" })
  customer_id: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
