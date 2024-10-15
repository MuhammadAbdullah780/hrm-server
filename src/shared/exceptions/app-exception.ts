import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor({
    msg,
    code = HttpStatus.NOT_FOUND,
    isSuccess = false,
  }: {
    isSuccess?: boolean;
    msg: string;
    code?: HttpStatus;
  }) {
    super({ isSuccess, message: msg }, code);
  }
}
