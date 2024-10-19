import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLAIMS_KEY } from '../decorators/claims.decorator';
import { ACCOUNT_TYPE_KEY } from '../decorators/set-account-type.decorator';
import { AccountTypeEnum } from '../enums/account-type';
import { AppClaimsEnum } from '../enums/app-claims';
import { AppException } from '../exceptions/app-exception';
import { RequestModified } from '../types/shared';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  //
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestModified;
    const claims = this.reflector.get<AppClaimsEnum[]>(
      CLAIMS_KEY,
      context.getHandler(),
    );
    const accountType = this.reflector.get<AccountTypeEnum>(
      ACCOUNT_TYPE_KEY,
      context.getHandler(),
    );

    try {
      const isAuthPersonAnAdmin =
        request?.accountType === AccountTypeEnum.ADMIN;
      const isAdminSpecificApi = accountType === AccountTypeEnum.ADMIN;

      // run account type validations

      // if account type matches
      if (request?.accountType === accountType) {
        return true;
      }

      // admin want to access employee specific api then return error
      if (isAuthPersonAnAdmin && !isAdminSpecificApi) {
        throw new AppException({
          msg: "You are an admin and you don't need to access user api's.",
          code: HttpStatus.NOT_ACCEPTABLE,
        });
      }

      // now it means the person is user and want to get admin specific api

      // ! now here starts the work of claims that managed later on

      // for now i am returning false
      return false;
    } catch {}

    return true;
  }
}
