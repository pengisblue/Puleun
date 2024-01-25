import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "192.168.30.*",
    credentials: true,
    exposedHeaders: ['Authorization'], // * 사용할 헤더 추가.
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
  await app.listen(3000);
}
bootstrap();
