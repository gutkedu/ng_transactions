import { AuthUserController } from '@modules/account/useCases/authUser/authUserController';
import { CreateUserInput } from '@modules/account/validations/userValidations';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import schemaValidate from '../middlewares/schemaValidate';

export const authRoutes = Router();

const authUserController = new AuthUserController();

authRoutes.post(
  '/session',
  checkSchema(CreateUserInput),
  schemaValidate(),
  authUserController.handle,
);
