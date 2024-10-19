import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserHandlers } from './handlers';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/shared/guards/jwt.guard';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // },
    UserService,
    ...UserHandlers,
  ],
  exports: [UserService],
})
export class UserModule {}
