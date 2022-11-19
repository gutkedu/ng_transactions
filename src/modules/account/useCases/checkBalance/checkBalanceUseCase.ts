import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { User } from '@modules/account/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  accountBalance: number;
}

@injectable()
export class CheckBalanceUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<IResponse> {
    const userExist = await this.usersRepository.findById(userId);
    if (!userExist) throw new AppError('invalid-user');

    const userAccount = await this.usersRepository.findUserAccount(
      userExist.username,
    );

    return { accountBalance: userAccount.account.balance };
  }
}
