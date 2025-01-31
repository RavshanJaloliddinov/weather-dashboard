import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/users/user.module';
import { config } from './config';
import { ValidationMiddleware } from 'src/common/middleware/validation..middleware';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { RolesGuardModule } from './common/guards/roles.module';
import { MiddlewareModule } from './common/middleware/midlleware.module';

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
    MiddlewareModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
