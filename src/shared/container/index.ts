import { AccountRepository } from '@modules/account/infra/typeorm/repositories/AccountsRepository';
import { UsersRepository } from '@modules/account/infra/typeorm/repositories/UsersRepository';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountRepository,
);
