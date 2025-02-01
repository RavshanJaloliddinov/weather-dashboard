import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/users/user.module';
import { config } from './config';
import { RolesGuardModule } from './common/guards/roles.module';
import { MiddlewareModule } from './common/middleware/midlleware.module';
import { WeatherModule } from './api/weather/weather.module';
import { ExceptionHandlerFilter } from './common/filters/ExceptionHandler';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Faqat rivojlanishda ishlatiladi
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UserModule,
    AuthModule,
    RolesGuardModule,
    WeatherModule
  ],
  providers: [
    {
      useClass: ExceptionHandlerFilter,
      provide: APP_FILTER
    }
  ],
})
export class AppModule { }
