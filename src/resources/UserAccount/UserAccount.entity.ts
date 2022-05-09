import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { UserInfo } from "~/resources/UserInfo/UserInfo.entity";

@Entity("user_account")
export class UserAccount extends BaseEntity {
  @Column()
  account_name: string;

  @Column()
  account_pwd: string;

  @Column({ default: false })
  is_admin: boolean;

  @PrimaryColumn()
  @OneToOne(() => UserInfo)
  @JoinColumn({ name: "user_id" })
  user_id: string;
}
