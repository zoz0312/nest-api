import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Request 차단
    transform: true, // 유저들이 보낸 요청을 실제 타입으로 변환시킴
  }));
  await app.listen(3000);
}
bootstrap();
