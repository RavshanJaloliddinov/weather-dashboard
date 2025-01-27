import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DATABASE_URL,
      entities: ["dist/core/entity/*.entity{.ts,.js}"],
      // autoLoadEntities: true,
      synchronize: true,
      logging: true, // Loglar yoqilgan
    }),
    UserModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule { }
