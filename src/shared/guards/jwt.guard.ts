import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AccountTypeEnum } from '../enums/account-type';
import { AppException } from '../exceptions/app-exception';
import { RequestModified, TokenDecoded } from '../types/shared';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestModified;
    const token = this.extractTokenFromHeader(request);
    const accountType = this.getAccountType(request) as AccountTypeEnum;

    if (!token)
      throw new AppException({
        msg: 'Un Authorized',
        code: HttpStatus.UNAUTHORIZED,
      });

    try {
      // decoding token
      const payload: TokenDecoded = await this.jwtService.verifyAsync(token, {
        secret: process.env?.JWT_ACCESS_SECRET_KEY,
      });

      // getting user through id
      const user = await this?.userService?.getUserThroughId(payload?.id);

      // setting user
      request.user = user;

      // setting account type
      request.accountType = accountType;
    } catch {
      throw new AppException({
        msg: 'UnAuthorized',
        code: HttpStatus.UNAUTHORIZED,
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: RequestModified) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getAccountType(req: RequestModified) {
    return req?.headers?.accountType;
  }
}
