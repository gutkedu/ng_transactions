import { Schema } from 'express-validator';

export const CreateUserInput: Schema = {
  username: {
    in: 'body',
    isString: { bail: true },
    isLength: { options: { min: 3, max: 25 } },
    errorMessage: 'invalid-username-format',
  },
  password: {
    in: 'body',
    isString: { bail: true },
    isStrongPassword: {
      options: {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minLowercase: 1,
        minSymbols: 0,
      },
    },
    errorMessage: 'invalid-password-format',
  },
};
