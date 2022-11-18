import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from './Account';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ select: false, type: 'varchar' })
  password: string;

  @Column({ type: 'uuid' })
  accountId: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
  account: Account;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  public deletedAt?: Date;
}
