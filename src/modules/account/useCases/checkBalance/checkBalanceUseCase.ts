import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { Account } from '@modules/account/infra/typeorm/entities/Account';

interface IResponse {
  userAccount: Account;
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
    return { userAccount: userExist.account };
  }
}
