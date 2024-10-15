import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './_models/user';

@Global()
@Module({
  imports: [],
})
export class DbModule {}
