import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from './Account';

@Entity('transaction')
export class Transaction {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  value: number;

  @Column({ select: false, type: 'varchar' })
  password: string;

  @Column({ type: 'uuid' })
  debitedAccountId: string;

  @Column({ type: 'uuid' })
  creditedAccountId: string;

  @ManyToOne(() => Account, (account) => account.debitedTransactions)
  debitedAccount: Account;

  @ManyToOne(() => Account, (account) => account.creditedTransactions)
  creditedAccount: Account;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  public deletedAt?: Date;
}
