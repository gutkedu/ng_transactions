import { IUserTransactionsSearchParameters } from '@modules/account/dtos/IUserTransactionsSearchParameter';
import { ICreateTransactionDTO } from '@modules/transactions/dtos/ICreateTransaction';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
import { query } from 'express';
import { DateTime } from 'luxon';
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

  async findCashOut(
    accountId: string,
    searchParameter?: IUserTransactionsSearchParameters,
  ): Promise<Transaction[]> {
    const query = this.repository.createQueryBuilder('transaction');
    query.where('transaction.debitedAccountId = :accountId', { accountId });

    if (searchParameter.transactionDate) {
      query.andWhere(
        'transaction.createdAt BETWEEN :startOfDay AND :endOfDay',
        {
          startOfDay: DateTime.fromISO(
            searchParameter.transactionDate as string,
          )
            .startOf('day')
            .toJSDate(),
          endOfDay: DateTime.fromISO(searchParameter.transactionDate as string)
            .endOf('day')
            .toJSDate(),
        },
      );
    }

    return query.getMany();
  }

  async findCashIn(
    accountId: string,
    searchParameter?: IUserTransactionsSearchParameters,
  ): Promise<Transaction[]> {
    const query = this.repository.createQueryBuilder('transaction');
    query.where('transaction.creditedAccountId = :accountId', { accountId });

    if (searchParameter.transactionDate) {
      query.andWhere(
        'transaction.createdAt BETWEEN :startOfDay AND :endOfDay',
        {
          startOfDay: DateTime.fromISO(
            searchParameter.transactionDate as string,
          )
            .startOf('day')
            .toJSDate(),
          endOfDay: DateTime.fromISO(searchParameter.transactionDate as string)
            .endOf('day')
            .toJSDate(),
        },
      );
    }

    return query.getMany();
  }
}
