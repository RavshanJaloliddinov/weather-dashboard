import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from './jwt.service';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    // Registratsiya qilish  
    async register(registerDto: RegisterDto): Promise<any> {
        const { username, password, name, surname } = registerDto; 

        // Parolni hash qilish
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.createUser({
            username,
            password: hashedPassword,
            name,
            surname,
        });

        // User yaratishdan so'ng, access va refresh tokenlarni yaratish
        const accessToken = await this.jwtService.generateAccessToken({
            userId: user.id,
            username: user.username,
        });

        const refreshToken = await this.jwtService.generateRefreshToken({
            userId: user.id,
            username: user.username,
        });

        return { accessToken, refreshToken };
    }

    // Login qilish
    async login(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;

        const user = await this.userService.findUserByUsername(username);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Login'dan so'ng, access va refresh tokenlarni yaratish
        const accessToken = await this.jwtService.generateAccessToken({
            userId: user.id,
            username: user.username,
        });

        const refreshToken = await this.jwtService.generateRefreshToken({
            userId: user.id,
            username: user.username,
        });

        return { accessToken, refreshToken };
    }
}
