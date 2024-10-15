import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenDecoded } from '../types/shared';
import { UserService } from 'src/user/user.service';
import { AppException } from '../exceptions/app-exception';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload: TokenDecoded = await this.jwtService.verifyAsync(token, {
        secret: process.env?.JWT_ACCESS_SECRET_KEY,
      });

      // getting user through id
      const user = await this?.userService?.getUserThroughId(payload?.id);

      // setting user
      request['user'] = user;
    } catch {
      throw new AppException({
        msg: 'UnAuthorized',
        code: HttpStatus.UNAUTHORIZED,
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
