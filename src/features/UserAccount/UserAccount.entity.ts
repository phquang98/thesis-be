import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { UserInfo } from "~/features/UserInfo/UserInfo.entity";

@Entity("user_account")
export class UserAccount extends BaseEntity {
  @Column({ name: "account_name" })
  accountName: string;

  @Column({ name: "account_pwd" })
  accountPwd: string;

  @Column({ default: false, name: "is_admin" })
  isAdmin: boolean;

  @OneToOne(() => UserInfo)
  @JoinColumn({ name: "user_id" })
  @PrimaryColumn()
  user_id: string; // NOTE: TypeORM bug, can't used userId with name user_id, will create 2 cols instead
}
