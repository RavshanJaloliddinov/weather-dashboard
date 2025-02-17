import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true, // DTOda bo‘lmagan maydonlarni avtomatik olib tashlaydi
    // forbidNonWhitelisted: true, // DTOda bo‘lmagan maydonlarni jo‘natishga ruxsat bermaydi
    transform: true, // So‘rov ma’lumotlarini avtomatik DTO formatiga o‘tkazadi
  }));

  app.enableCors({
    origin: '*', // Barcha domenlarga ruxsat beradi (Ishlab chiqish uchun)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });


  // app.useLogger(console); // Loglarni yoqish

  const swagger = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT, () => {
    console.log(`Running in ${config.PORT}`)
  });
}
bootstrap();
