import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, HttpException, ValidationError, ValidationPipe} from "@nestjs/common";
import {HttpExceptionFilter} from "./filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
