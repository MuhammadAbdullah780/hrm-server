import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async comparePasswords() {}

  async getAccessToken(payload: Record<string, any>) {
    const EXPIRE_TIME = 3600 * 1000 * 24;

    const token = await this.jwtService?.signAsync(payload, {
      expiresIn: '1d',
      secret: process?.env?.JWT_ACCESS_SECRET_KEY,
    });

    return {
      token,
      expires_in: new Date()?.setTime(new Date()?.getTime() + EXPIRE_TIME),
    };
  }
}
