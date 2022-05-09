import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user_info")
export class UserInfo extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  pnum: string;
}
