import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestModified } from '../types/shared';

export const GetAccountType = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest() as RequestModified;
    return request?.accountType;
  },
);
