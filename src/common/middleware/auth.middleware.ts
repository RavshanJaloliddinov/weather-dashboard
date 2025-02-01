import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'src/config';

interface AuthRequest extends Request {
    user?: any; // Tokenni dekod qilgandan keyin user ma’lumotlari shu yerga joylanadi
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: AuthRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET_KEY); // Aslida, secret-key .env faylda bo‘lishi kerak
            req.user = decoded; // Foydalanuvchi ma’lumotlarini request-ga qo‘shamiz
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}
