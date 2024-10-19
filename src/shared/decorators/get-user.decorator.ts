import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admins, User as PrismaUser } from '@prisma/client';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): Admins | PrismaUser => {
    const request = ctx.switchToHttp().getRequest();
    return request?.user;
  },
);
