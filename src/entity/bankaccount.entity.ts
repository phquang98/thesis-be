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
  @Column()
  customerID: string;

  @CreateDateColumn()
  createdAt: Date;
}
