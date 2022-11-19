import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findById(userId: string): Promise<User>;
}
