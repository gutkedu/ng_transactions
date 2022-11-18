import { ICreateAccountDTO } from '@modules/account/dtos/ICreateAccountDTO';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';
import { getRepository, Repository } from 'typeorm';
import { Account } from '../entities/Account';

class AccountRepository implements IAccountsRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Account);
  }

  async create(account: ICreateAccountDTO): Promise<Account> {
    return this.repository.save(account);
  }

  async findById(accountId: string): Promise<Account> {
    return this.repository.findOne(accountId);
  }
}
