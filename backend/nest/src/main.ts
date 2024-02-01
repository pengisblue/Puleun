import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://172.23.48.1:3000/","192.168.30.*"],
    credentials: true,
    exposedHeaders: ['Authorization','*'], // * 사용할 헤더 추가.
  });
  const config = new DocumentBuilder()
    .setTitle('pliends')
    .setDescription('ETA commonPJT pliends API description')
    .setVersion('1.0')
    .addTag('User') // Controller mapping
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000);
}
bootstrap();
