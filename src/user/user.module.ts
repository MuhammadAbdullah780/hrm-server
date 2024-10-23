import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserHandlers } from './handlers';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/db/models/user';

@Module({
  imports: [
    //
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    //
    JwtModule,
  ],
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
