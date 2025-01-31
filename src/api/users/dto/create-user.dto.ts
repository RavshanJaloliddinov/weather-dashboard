import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'User\'s first name',
        example: 'John',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    name: string;

    @ApiProperty({
        description: 'User\'s last name',
        example: 'Doe',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    surname: string;

    @ApiProperty({
        description: 'Unique username for the user',
        example: 'johndoe123',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username faqat harflar, raqamlar va pastki chiziq (_) dan iborat bo‘lishi kerak' })
    username: string;

    @ApiProperty({
        description: 'Password for the user account',
        example: 'StrongP@ssword123',
        minLength: 8,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Parolda kamida bitta katta harf, bitta raqam va bitta maxsus belgi (@$!%*?&) bo‘lishi kerak'
    })
    password: string;
}
