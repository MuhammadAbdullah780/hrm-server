import { Routes } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { MeModule } from 'src/me/me.module';
import { UserModule } from 'src/user/user.module';

export const appRoutes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/me',
    module: MeModule,
  },
  {
    path: '/user',
    module: UserModule,
  },
];
