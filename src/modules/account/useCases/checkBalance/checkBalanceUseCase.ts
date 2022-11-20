import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  userBalance: number;
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
    return { userBalance: userExist.account.balance };
  }
}
