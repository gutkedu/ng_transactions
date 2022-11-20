import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';
import { Transaction } from '@modules/transactions/infra/typeorm/entities/Transaction';
import { IUserTransactionsSearchParameters } from '@modules/account/dtos/IUserTransactionsSearchParameter';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  userId: string;
  searchParameter?: IUserTransactionsSearchParameters;
}

interface IResponse {
  userCashOutTransactions?: Transaction[];
  userCashInTransactions?: Transaction[];
}

@injectable()
export class UserTransactionsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
    @inject('TransactionsRepository')
    private transactionRepository: ITransactionsRepository,
  ) {}

  async execute({ userId, searchParameter }: IRequest): Promise<any> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError('user-dont-exist');

    if (searchParameter.isCashIn) {
      const userCashInTransactions =
        await this.transactionRepository.findCashIn(
          user.accountId,
          searchParameter,
        );
      return {
        userCashInTransactions,
      } as IResponse;
    } else if (searchParameter.isCashOut) {
      const userCashOutTransactions =
        await this.transactionRepository.findCashOut(
          user.accountId,
          searchParameter,
        );
      return {
        userCashOutTransactions,
      } as IResponse;
    } else {
      const [userCashInTransactions, userCashOutTransactions] =
        await Promise.all([
          this.transactionRepository.findCashIn(
            user.accountId,
            searchParameter,
          ),
          this.transactionRepository.findCashOut(
            user.accountId,
            searchParameter,
          ),
        ]);
      return {
        userCashInTransactions,
        userCashOutTransactions,
      } as IResponse;
    }
  }
}
