export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, isOperational: boolean, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
