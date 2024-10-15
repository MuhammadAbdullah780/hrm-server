import { Global, Module } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  imports: [JwtModule, UserModule],
  providers: [JwtGuard, PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
