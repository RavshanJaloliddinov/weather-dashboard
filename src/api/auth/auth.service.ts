import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from './jwt.service';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserRoles } from 'src/common/database/Enums';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    // Registratsiya qilish  
    async register(registerDto: RegisterDto): Promise<any> {
        try {
            const user = await this.userService.createUser({ ...registerDto, role: UserRoles.user });

            const accessToken = await this.jwtService.generateAccessToken({
                userId: user.id,
                username: user.username,
                role: user.role,
            });

            const refreshToken = await this.jwtService.generateRefreshToken({
                userId: user.id,
                username: user.username,
                role: user.role,
            });

            return { accessToken, refreshToken };
        } catch (error) {
            throw new InternalServerErrorException('User registration failed');
        }
    }

    // Login qilish
    async login(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;

        try {
            const user = await this.userService.findUserByUsername(username);

            if (!user) {
                throw new BadRequestException('Invalid credentials: User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new BadRequestException('Invalid credentials: Incorrect password');
            }

            // Login'dan so'ng, access va refresh tokenlarni yaratish
            const accessToken = await this.jwtService.generateAccessToken({
                userId: user.id,
                username: user.username,
                role: user.role,
            });

            const refreshToken = await this.jwtService.generateRefreshToken({
                userId: user.id,
                username: user.username,
                role: user.role,
            });

            return { accessToken, refreshToken };
        } catch (error) {
            // Agar login xatosi bo'lsa, foydalanuvchiga aniq xato xabarini ko'rsatish
            throw new BadRequestException(error.message || 'Login failed');
        }
    }

    // Access tokenni yangilash
    async refreshAccessToken(refreshToken: string): Promise<any> {
        try {
            // Refresh tokenni tekshirish
            const payload = await this.jwtService.verifyRefreshToken(refreshToken);
            
            if (!payload) {
                throw new BadRequestException('Invalid refresh token');
            }

            // Refresh token yordamida yangi access token yaratish
            const accessToken = await this.jwtService.generateAccessToken({
                userId: payload.userId,
                username: payload.username,
                role: payload.role,
            });

            return { accessToken };
        } catch (error) {
            throw new BadRequestException('Failed to refresh access token');
        }
    }
}
