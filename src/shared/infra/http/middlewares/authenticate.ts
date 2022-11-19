import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('missing-token', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError('invalid-token', 401);
  }
}
