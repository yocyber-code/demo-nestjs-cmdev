import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ default: null })
  image: string;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  update: Date;

  @VersionColumn({ default: null })
  version: number;
}
