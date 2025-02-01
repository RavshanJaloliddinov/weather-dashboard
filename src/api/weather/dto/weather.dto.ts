import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class WeatherDto {
  @ApiProperty({ description: 'Shahar nomi', example: 'Tashkent' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Mamlakat nomi', example: 'Uzbekistan' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Kenglik', example: 41.2646 })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ description: 'Uzunlik', example: 69.2163 })
  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @ApiProperty({ description: 'Harorat (Celsius)', example: 25 })
  @IsNumber()
  @IsNotEmpty()
  temp_c: number;

  @ApiProperty({ description: 'Harorat rangi', example: '#FFCC80' })
  @IsString()
  @IsNotEmpty()
  temp_color: string;

  @ApiProperty({ description: 'Shamol tezligi (km/h)', example: 15 })
  @IsNumber()
  @IsNotEmpty()
  wind_kph: number;

  @ApiProperty({ description: 'Shamol rangi', example: '#B2EBF2' })
  @IsString()
  @IsNotEmpty()
  wind_color: string;

  @ApiProperty({ description: 'Bulut qoplami (%)', example: 20 })
  @IsNumber()
  @IsNotEmpty()
  cloud: number;

  @ApiProperty({ description: 'Bulut rangi', example: '#FFF176' })
  @IsString()
  @IsNotEmpty()
  cloud_color: string;
}