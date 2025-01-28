import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        description: 'User\'s first name (optional)',
        example: 'John',
        required: false,
    })
    name?: string;

    @ApiProperty({
        description: 'User\'s last name (optional)',
        example: 'Doe',
        required: false,
    })
    surname?: string;

    @ApiProperty({
        description: 'Unique username for the user (optional)',
        example: 'johndoe123',
        required: false,
    })
    username?: string;

    @ApiProperty({
        description: 'Password for the user account (optional)',
        example: 'UpdatedP@ssword123',
        required: false,
    })
    password?: string;
}
