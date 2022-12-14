import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import { router } from './routes';
import { ValidateError } from '@shared/errors/ValidateError';

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    } else if (err instanceof ValidateError) {
      return response.status(err.statusCode).json({
        errors: err.validation.array({ onlyFirstError: true }),
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
