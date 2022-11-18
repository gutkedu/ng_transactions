import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(user: ICreateUserDTO): Promise<User> {
    return this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    return this.repository.findOne({ where: { username } });
  }

  async findById(userId: string): Promise<User> {
    return this.repository.findOne(userId);
  }

  async findUserAccount(username: string): Promise<User> {
    return this.repository.findOne({
      where: { username },
      relations: ['account'],
    });
  }
}
