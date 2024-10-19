import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { MeModule } from './me/me.module';
import { appRoutes } from './shared/config/routes';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from './admins/admins.module';
import { AccessManagerModule } from './access-manager/access-manager.module';

@Module({
  imports: [
    //
    RouterModule.register(appRoutes),

    //
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    //
    // MongooseModule.forRoot(process?.env?.DB_URI),
    JwtModule,

    /**
     * Modules
     */
    SharedModule,
    UserModule,
    MeModule,
    DbModule,
    AuthModule,
    AdminsModule,
    AccessManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
