import { Body, Controller, Post } from '@nestjs/common';
import { LoginHandler } from './handlers/login.handler';
import { RefereshTokenHandler } from './handlers/referesh-token.handler';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(
    // Handlers
    private readonly loginHandler: LoginHandler,
    private readonly refereshTokenHandler: RefereshTokenHandler,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this?.loginHandler?.handle(body);
  }
}
