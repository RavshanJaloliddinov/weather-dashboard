import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CurrentWeatherDto {
    @ApiProperty({ description: 'Location query (e.g., city name, zip code)', example: 'London' })
    @IsString()
    @IsNotEmpty()
    q: string;
}