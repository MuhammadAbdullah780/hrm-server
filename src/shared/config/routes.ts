import { Routes } from '@nestjs/core';
import { AccessManagerModule } from 'src/access-manager/access-manager.module';
import { AdminsModule } from 'src/admins/admins.module';
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
  {
    path: '/admins',
    module: AdminsModule,
  },
  {
    path: '/access-control',
    module: AccessManagerModule,
  },
];
