import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthHandlers } from './handlers';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [UserModule, JwtModule, AdminsModule],
  controllers: [AuthController],
  providers: [AuthService, ...AuthHandlers],
  exports: [AuthService],
})
export class AuthModule {}
