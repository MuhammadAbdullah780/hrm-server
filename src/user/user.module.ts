import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/db/_models/user';
import { CreateUserHandler } from './handlers/create-user.handler';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,

    // MongooseModule?.forFeature([
    //   {
    //     name: User.name,
    //     schema: userSchema,
    //     collection: 'users',
    //   },
    // ]),
  ],
  controllers: [UserController],
  providers: [UserService, CreateUserHandler],
  exports: [UserService],
})
export class UserModule {}
