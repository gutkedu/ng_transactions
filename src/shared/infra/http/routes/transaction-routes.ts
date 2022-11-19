import { CashOutController } from '@modules/transactions/useCases/cashOut/cashOutController';
import { ICreateCashOutInput } from '@modules/transactions/validations/transactionValidation';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { authenticate } from '../middlewares/authenticate';
import schemaValidate from '../middlewares/schemaValidate';

export const transactionRoutes = Router();

const cashOutController = new CashOutController();

transactionRoutes.post(
  '/cash-out',
  checkSchema(ICreateCashOutInput),
  schemaValidate(),
  authenticate,
  cashOutController.handle,
);
