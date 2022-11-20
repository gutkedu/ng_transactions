import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CashOutUseCase } from './cashOutUseCase';

export class CashOutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { cashOutValue, cashInUsername } = request.body;

    const cashOutUseCase = container.resolve(CashOutUseCase);

    await cashOutUseCase.execute({ userId: id, cashInUsername, cashOutValue });

    return response.status(204).send();
  }
}
