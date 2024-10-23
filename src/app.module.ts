import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessManagerModule } from './access-manager/access-manager.module';
import { AdminsModule } from './admins/admins.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { MeModule } from './me/me.module';
import { appRoutes } from './shared/config/routes';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

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
    MongooseModule.forRoot(
      'mongodb+srv://ma0401431:z6S3t53tE3kWVYa2@cluster0.ihhcazn.mongodb.net/hrm-dev-db?retryWrites=true&w=majority&appName=Cluster0',
    ),

    //
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
