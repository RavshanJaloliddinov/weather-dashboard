import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'User\'s first name',
        example: 'John',
    })
    name: string;

    @ApiProperty({
        description: 'User\'s last name',
        example: 'Doe',
    })
    surname: string;

    @ApiProperty({
        description: 'Unique username for the user',
        example: 'johndoe123',
    })
    username: string;

    @ApiProperty({
        description: 'Password for the user account',
        example: 'StrongP@ssword123',
        minLength: 8,
    })
    password: string;
}
