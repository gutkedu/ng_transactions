import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
import { AppError } from '@shared/errors/AppError';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';

interface IRequest {
  cashInUsername: string;
  userId: string;
  cashOutValue: number;
}

@injectable()
export class CashOutUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('TransactionsRepository')
    private transactionRepository: ITransactionsRepository,
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
  ) {}

  async execute({
    userId,
    cashInUsername,
    cashOutValue,
  }: IRequest): Promise<void> {
    const cashInUserExist = await this.usersRepository.findByUsername(
      cashInUsername,
    );
    if (!cashInUserExist) throw new AppError('cash-in-user-does-not-exist');

    const cashOutUser = await this.usersRepository.findById(userId);

    if (cashOutUser.id === cashInUserExist.id) {
      throw new AppError('cannot-transfer-for-the-same-user');
    }

    if (cashOutValue > cashOutUser.account.balance) {
      throw new AppError('insufficient-balance');
    }

    await Promise.all([
      this.transactionRepository.create({
        value: cashOutValue,
        debitedAccountId: cashOutUser.accountId,
        creditedAccountId: cashInUserExist.accountId,
      }),
      this.accountRepository.updateBalance(
        cashOutUser.accountId,
        cashInUserExist.account.balance - cashOutValue,
      ),
      this.accountRepository.updateBalance(
        cashInUserExist.accountId,
        cashInUserExist.account.balance + cashOutValue,
      ),
    ]);
  }
}
