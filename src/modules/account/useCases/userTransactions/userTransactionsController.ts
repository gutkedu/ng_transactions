import { IUserTransactionsSearchParameters } from '@modules/account/dtos/IUserTransactionsSearchParameter';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserTransactionsUseCase } from './userTransactionsUseCase';

export class UserTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const searchParameter: IUserTransactionsSearchParameters = {
      transactionDate: request.query.transactionDate as string,
      isCashIn: request.query.isCashIn === 'true',
      isCashOut: request.query.isCashOut === 'true',
    };

    const userTransactionsUseCase = container.resolve(UserTransactionsUseCase);

    const transactions = await userTransactionsUseCase.execute({
      userId: id,
      searchParameter,
    });

    return response.status(200).json(transactions);
  }
}
