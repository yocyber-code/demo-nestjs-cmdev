import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  salt: string;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  update: Date;

  @VersionColumn({ default: null })
  version: number;

  async validatePassword(password) {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
