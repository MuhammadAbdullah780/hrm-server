import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminsHandlers } from './handlers';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/db/models/admins';

@Module({
  imports: [
    //
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),

    //
    JwtModule,
    UserModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService, ...AdminsHandlers],
  exports: [AdminsService],
})
export class AdminsModule {}
