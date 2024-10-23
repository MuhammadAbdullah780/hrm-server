import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './models/admins';
import { User, UserSchema } from './models/user';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class DbModule {}
