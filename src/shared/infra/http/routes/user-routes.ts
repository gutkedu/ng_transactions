import { CheckBalanceController } from '@modules/account/useCases/checkBalance/checkBalanceController';
import { CreateUserController } from '@modules/account/useCases/createUser/createUserController';
import { CreateUserInput } from '@modules/account/validations/userValidations';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { authenticate } from '../middlewares/authenticate';
import schemaValidate from '../middlewares/schemaValidate';

export const userRoutes = Router();

const createUserController = new CreateUserController();
const checkBalanceController = new CheckBalanceController();

userRoutes.post(
  '/',
  checkSchema(CreateUserInput),
  schemaValidate(),
  createUserController.handle,
);

userRoutes.get('/balance', authenticate, checkBalanceController.handle);
