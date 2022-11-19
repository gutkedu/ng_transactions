import { ICreateAccountDTO } from '@modules/account/dtos/ICreateAccountDTO';
import { IAccountsRepository } from '@modules/account/repositories/IAccountsRepository';
import { getRepository, Repository } from 'typeorm';
import { Account } from '../entities/Account';

export class AccountRepository implements IAccountsRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Account);
  }

  async create(account: ICreateAccountDTO): Promise<Account> {
    const newAccount = this.repository.create(account);
    await this.repository.save(newAccount);
    return newAccount;
  }

  async findById(accountId: string): Promise<Account> {
    return this.repository.findOne(accountId);
  }

  async updateBalance(accountId: string, balance: number): Promise<void> {
    await this.repository.update(accountId, { balance });
  }
}
