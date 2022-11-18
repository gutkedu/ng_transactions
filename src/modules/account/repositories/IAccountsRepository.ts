import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { Account } from '../infra/typeorm/entities/Account';

export interface IAccountsRepository {
  create(account: ICreateAccountDTO): Promise<Account>;
  findById(accountId: string): Promise<Account>;
}
