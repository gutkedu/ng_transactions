import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './createUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const newUser = await createUserUseCase.execute({ username, password });

    return response.status(201).send(newUser);
  }
}
