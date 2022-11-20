import { IUserTransactionsSearchParameters } from '@modules/account/dtos/IUserTransactionsSearchParameter';
import { ICreateTransactionDTO } from '../dtos/ICreateTransaction';
import { Transaction } from '../infra/typeorm/entities/Transaction';

export interface ITransactionsRepository {
  create(transaction: ICreateTransactionDTO): Promise<Transaction>;
  findCashOut(
    accountId: string,
    searchParameter?: IUserTransactionsSearchParameters,
  ): Promise<Transaction[]>;
  findCashIn(
    accountId: string,
    searchParameter?: IUserTransactionsSearchParameters,
  ): Promise<Transaction[]>;
}
