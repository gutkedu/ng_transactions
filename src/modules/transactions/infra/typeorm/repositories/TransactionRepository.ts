import { ICreateTransactionDTO } from '@modules/transactions/dtos/ICreateTransaction';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
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
}
