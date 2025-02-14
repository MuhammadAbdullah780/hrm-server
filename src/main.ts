import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app?.setGlobalPrefix('/api/v1', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });

  await app.listen(8000);
}
bootstrap();
