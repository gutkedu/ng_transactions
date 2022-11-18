import { Result, ValidationError } from 'express-validator';

export class ValidateError {
  public readonly message: string;
  public readonly validation: Result<ValidationError>;
  public readonly statusCode: number;

  constructor(
    validation: Result<ValidationError>,
    message?: string,
    statusCode = 400,
  ) {
    this.validation = validation;
    this.message = message;
    this.statusCode = statusCode;
  }
}
