import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  // Access token yaratish
  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  // Refresh token yaratish
  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY, // .env faylidan olish
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME, // refresh token muddati
    });
  }

  // Tokenni tekshirish
  async verifyToken(token: string, isRefreshToken: boolean = false): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: isRefreshToken
          ? process.env.REFRESH_TOKEN_SECRET_KEY
          : process.env.ACCESS_TOKEN_SECRET_KEY,
      });
    } catch (error) {
      throw new Error('Token is invalid or expired');
    }
  }
}
