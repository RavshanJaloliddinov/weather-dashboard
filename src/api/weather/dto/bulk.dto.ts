import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
    @ApiProperty({ description: 'Location query (e.g., city name, zip code)', example: 'London' })
    @IsString()
    @IsNotEmpty()
    q: string;

    @ApiProperty({ description: 'Custom ID for internal use', example: 'my-id-1', required: false })
    @IsString()
    @IsOptional()
    custom_id?: string;
}

export class BulkRequestDto {
    @ApiProperty({ type: [LocationDto], description: 'List of locations' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LocationDto)
    locations: LocationDto[];
}