import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches
} from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'johndoe123',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username faqat harflar, raqamlar va pastki chiziq (_) dan iborat bo‘lishi kerak' })
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'StrongP@ssword123',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    password: string;
}
