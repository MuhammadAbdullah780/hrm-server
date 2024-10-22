import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminsHandlers } from './handlers';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [JwtModule, UserModule, PrismaModule],
  controllers: [AdminsController],
  providers: [AdminsService, ...AdminsHandlers],
  exports: [AdminsService],
})
export class AdminsModule {}
