import { Schema } from 'express-validator';

export const ICreateCashOutInput: Schema = {
  cashInUsername: {
    in: 'body',
    isString: true,
    isLength: { options: { min: 3, max: 25 } },
    errorMessage: 'invalid-username-format',
  },
  cashOutValue: {
    in: 'body',
    isNumeric: true,
  },
};
