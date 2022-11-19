import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';
import { Transaction } from '@modules/transactions/infra/typeorm/entities/Transaction';

interface IRequest {
  userId: string;
}

interface IResponse {
  debitedTransactions: Transaction[];
  creditedTransactions: Transaction[];
}

@injectable()
export class UserTransactionsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    const userTransactions = await this.accountRepository.getUserTransactions(
      user.accountId,
    );

    return {
      debitedTransactions: userTransactions.debitedTransactions,
      creditedTransactions: userTransactions.creditedTransactions,
    } as IResponse;
  }
}
