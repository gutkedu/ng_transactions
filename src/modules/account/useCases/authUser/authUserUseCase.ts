import auth from '@config/auth';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    username: string;
  };
  token: string;
}

@injectable()
export class AuthUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const { expires_in_token, secret_token } = auth;

    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new AppError('incorrect email or password');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError('incorrect email or password');

    const token = sign({ username }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    return { user: { username }, token } as IResponse;
  }
}
