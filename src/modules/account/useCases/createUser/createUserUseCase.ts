import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { User } from '@modules/account/infra/typeorm/entities/User';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute(user: ICreateUserDTO): Promise<User> {
    const userExist = await this.usersRepository.findByUsername(user.username);
    if (userExist) throw new AppError('user already exist');

    const passwordHash = await hash(user.password, 8);

    const userAccount = await this.accountsRepository.create({ balance: 100 });

    console.log(userAccount);

    const newUser = await this.usersRepository.create({
      username: user.username,
      password: passwordHash,
      accountId: userAccount.id,
    });

    return newUser;
  }
}
