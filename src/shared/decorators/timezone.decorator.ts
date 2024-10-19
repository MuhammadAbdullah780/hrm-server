import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Timezone = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request?.headers?.timezone || 'Asia/Karachi';
  },
);
