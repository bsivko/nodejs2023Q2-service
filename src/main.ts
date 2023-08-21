import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppDataSource, AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('App starts...');

  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
      console.log('DB initialized!');
    })
    .catch((error) => console.log(error));

  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 4000;
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service for RS-School')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
