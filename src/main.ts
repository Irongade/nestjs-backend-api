import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  // introduce cors protection
  app.enableCors({
    origin: '*', // this is not ideal, just putting this here for dev purposes, this should be replaced with a valid origin
    credentials: true,
  });

  // add helmet
  app.use(helmet());

  // swagger documentation
  const config = new DocumentBuilder()
    .setTitle('LeoVegas')
    .setDescription('The leoVegas API description')
    .setVersion('1.0')
    .addTag('leoVegas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger-docs', app, document);

  await app.listen(3000);
}
bootstrap();
