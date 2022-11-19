import { ICreateTransactionDTO } from '@modules/transactions/dtos/ICreateTransaction';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
import { query } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Transaction } from '../entities/Transaction';

export class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async create(transaction: ICreateTransactionDTO): Promise<Transaction> {
    const newTransaction = this.repository.create(transaction);
    return this.repository.save(newTransaction);
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    const query = await this.repository
      .createQueryBuilder('transaction')
      .where('debitedAccountId = :id', { id: accountId })
      .orWhere('creditedAccountId = :id', { id: accountId })
      .getMany();
    return query;
  }
}
