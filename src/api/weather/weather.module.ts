// src/weather/weather.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherEntity } from 'src/core/entity/weather.entity';
import { WeatherService } from './weather.service';
// import { WeatherRepository } from 'src/core/repository/weather.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherEntity])], // AxiosModule import qilindi
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule { }
