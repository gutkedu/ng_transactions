import { ICreateTransactionDTO } from '../dtos/ICreateTransaction';
import { Transaction } from '../infra/typeorm/entities/Transaction';

export interface ITransactionsRepository {
  create(transaction: ICreateTransactionDTO): Promise<Transaction>;
}
