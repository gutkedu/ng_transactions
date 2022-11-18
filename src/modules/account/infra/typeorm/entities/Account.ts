import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '@modules/transactions/infra/typeorm/entities/Transaction';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  debitedTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  creditedTransactions: Transaction[];

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  public deletedAt?: Date;
}
