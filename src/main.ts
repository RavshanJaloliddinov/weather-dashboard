import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swagger = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document);
 
  await app.listen(config.PORT);
}
bootstrap( );
