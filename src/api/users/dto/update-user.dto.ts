import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ description: 'User name', required: false })
    name?: string;

    @ApiProperty({ description: 'User surname', required: false })
    surname?: string;

    @ApiProperty({ description: 'User username', required: false })
    username?: string;

    @ApiProperty({ description: 'User password', required: false })
    password?: string;
}
