import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async findByUsername(username: string): Promise<User> {
    return this.repository.findOne({
      where: { username },
      relations: ['account'],
    });
  }

  async findById(userId: string): Promise<User> {
    return this.repository.findOne(userId, { relations: ['account'] });
  }
}
