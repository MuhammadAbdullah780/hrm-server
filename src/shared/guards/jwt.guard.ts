import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { UserService } from 'src/user/user.service';
import { AccountTypeEnum } from '../enums/account-type';
import { AppException } from '../exceptions/app-exception';
import { RequestModified, TokenDecoded } from '../types/shared';
import { DbModels } from 'src/db/typings';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly adminService: AdminsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestModified;
    const token = this.extractTokenFromHeader(request);

    if (!token)
      throw new AppException({
        msg: 'Un Authorized',
        code: HttpStatus.UNAUTHORIZED,
      });

    try {
      // decoding token
      const { account_type, id }: TokenDecoded =
        await this.jwtService.verifyAsync(token, {
          secret: process.env?.JWT_ACCESS_SECRET_KEY,
        });

      if (account_type === AccountTypeEnum.ADMIN) {
        // get admin through admin Id
        const admin = await this.adminService?.getAdminThroughId(id);

        // setting information in request object
        this.modifyRequestPayload(request, {
          accountType: account_type,
          user: admin,
        });
      } else {
        // getting user through id
        const user = await this?.userService?.getUserThroughId(id);

        // setting information in request object
        this.modifyRequestPayload(request, {
          accountType: account_type,
          user: user,
        });
      }
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

  private modifyRequestPayload(
    request: RequestModified,
    {
      accountType,
      user,
    }: { user: DbModels.IAdmin | DbModels.IUser; accountType: AccountTypeEnum },
  ) {
    // setting user
    request.user = user;

    // setting account type
    request.accountType = accountType;
  }
}
