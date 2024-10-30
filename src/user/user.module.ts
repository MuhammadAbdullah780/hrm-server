import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/db/models/user';
import { UserHandlers } from './handlers';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
  providers: [UserService, ...UserHandlers],
  exports: [UserService],
})
export class UserModule {}
