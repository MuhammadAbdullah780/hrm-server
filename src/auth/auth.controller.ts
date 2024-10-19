import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import { z } from 'zod';
import { LoginDto } from './dto/login.dto';
import { LoginHandler } from './handlers/login.handler';
import { RefereshTokenHandler } from './handlers/referesh-token.handler';

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
  @UsePipes(new ZodValidationPipe(LoginDto))
  @Post('/login')
  async login(@Body() body: z.infer<typeof LoginDto>) {
    return await this?.loginHandler?.handle(body);
  }
}
