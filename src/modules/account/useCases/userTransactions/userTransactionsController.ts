import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserTransactionsUseCase } from './userTransactionsUseCase';

export class UserTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userTransactionsUseCase = container.resolve(UserTransactionsUseCase);

    const transactions = await userTransactionsUseCase.execute({ userId: id });

    return response.status(200).json(transactions);
  }
}
