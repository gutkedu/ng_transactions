import { CreateUserController } from '@modules/account/useCases/createUser/createUserController';
import { CreateUserInput } from '@modules/account/validations/userValidations';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import schemaValidate from '../middlewares/schemaValidate';

export const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post(
  '/',
  checkSchema(CreateUserInput),
  schemaValidate(),
  createUserController.handle,
);
