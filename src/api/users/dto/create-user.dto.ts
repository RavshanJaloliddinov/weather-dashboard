import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'User name' })
    name: string;

    @ApiProperty({ description: 'User surname' })
    surname: string;

    @ApiProperty({ description: 'User username' })
    username: string;

    @ApiProperty({ description: 'User password' })
    password: string;
}
