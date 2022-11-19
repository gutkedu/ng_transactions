import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthUserUseCase } from './authUserUseCase';

export class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authUserUseCase = container.resolve(AuthUserUseCase);

    const token = await authUserUseCase.execute({
      username,
      password,
    });

    return response.json(token);
  }
}
