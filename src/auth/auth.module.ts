import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginHandler } from './handlers/login.handler';
import { RefereshTokenHandler } from './handlers/referesh-token.handler';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LoginHandler, RefereshTokenHandler],
})
export class AuthModule {}
