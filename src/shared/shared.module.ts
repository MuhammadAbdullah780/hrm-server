import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from 'src/admins/admins.module';
import { UserModule } from 'src/user/user.module';
import { JwtGuard } from './guards/jwt.guard';

@Global()
@Module({
  imports: [JwtModule, UserModule, AdminsModule],
  providers: [JwtGuard],
  exports: [],
})
export class SharedModule {}
