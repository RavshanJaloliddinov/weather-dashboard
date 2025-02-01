import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AlertDto {
    @ApiProperty({ description: 'Alert headline', example: 'Flood Warning issued' })
    @IsString()
    @IsNotEmpty()
    headline: string;

    @ApiProperty({ description: 'Message type', example: 'Alert' })
    @IsString()
    @IsNotEmpty()
    msgtype: string;

    @ApiProperty({ description: 'Severity level', example: 'Moderate' })
    @IsString()
    @IsNotEmpty()
    severity: string;

    @ApiProperty({ description: 'Urgency level', example: 'Expected' })
    @IsString()
    @IsNotEmpty()
    urgency: string;

    @ApiProperty({ description: 'Affected areas', example: 'Calhoun; Lexington; Richland' })
    @IsString()
    @IsNotEmpty()
    areas: string;

    @ApiProperty({ description: 'Category', example: 'Met' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({ description: 'Certainty level', example: 'Likely' })
    @IsString()
    @IsNotEmpty()
    certainty: string;

    @ApiProperty({ description: 'Event type', example: 'Flood Warning' })
    @IsString()
    @IsNotEmpty()
    event: string;

    @ApiProperty({ description: 'Additional note', example: 'Alert for Calhoun; Lexington; Richland', required: false })
    @IsString()
    @IsOptional()
    note?: string;

    @ApiProperty({ description: 'Effective time', example: '2021-01-05T21:47:00-05:00' })
    @IsString()
    @IsNotEmpty()
    effective: string;

    @ApiProperty({ description: 'Expiration time', example: '2021-01-07T06:15:00-05:00' })
    @IsString()
    @IsNotEmpty()
    expires: string;

    @ApiProperty({ description: 'Description', example: 'The Flood Warning continues for the following rivers...' })
    @IsString()
    @IsNotEmpty()
    desc: string;

    @ApiProperty({ description: 'Instructions', example: 'A Flood Warning means that flooding is imminent...', required: false })
    @IsString()
    @IsOptional()
    instruction?: string;
}