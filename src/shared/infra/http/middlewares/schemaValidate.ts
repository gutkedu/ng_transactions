import { ValidateError } from '@shared/errors/ValidateError';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

function schemaValidate() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors);
    }

    return next();
  };
}

export default schemaValidate;
