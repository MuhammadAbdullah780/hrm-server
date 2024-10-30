import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import { loginValidationSchema } from './validations/login';
import { LoginHandler } from './handlers/login.handler';
import { RefereshTokenHandler } from './handlers/referesh-token.handler';
import { LoginDto } from './typings';

@Controller()
export class AuthController {
  constructor(
    // Handlers
    private readonly loginHandler: LoginHandler,
    private readonly refereshTokenHandler: RefereshTokenHandler,
  ) {}

  /**
   * @description Login Api
   * @endpoint `/api/v1/auth/login`
   * @method `POST`
   */
  @UsePipes(new ZodValidationPipe(loginValidationSchema))
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this?.loginHandler?.handle(body);
  }
}
