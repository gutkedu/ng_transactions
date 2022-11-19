import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CheckBalanceUseCase } from './checkBalanceUseCase';

export class CheckBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const checkBalanceUseCase = container.resolve(CheckBalanceUseCase);

    const userBalance = await checkBalanceUseCase.execute(id);

    return response.status(200).json(userBalance);
  }
}
