import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor({
    msg,
    code = HttpStatus.NOT_FOUND,
    isSuccess = false,
    details,
  }: {
    isSuccess?: boolean;
    msg: string;
    code?: HttpStatus;
    details?: Record<string, any>;
  }) {
    super({ isSuccess, message: msg, details, status: code }, code);
  }
}
