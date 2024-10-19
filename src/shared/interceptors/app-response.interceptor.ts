import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((res) => {
        return {
          data: res?.data,
          isSuccess: true,
          message: res?.message,
          timestamp: new Date(Date.now())?.toLocaleTimeString(),
          ...res,
        };
      }),
    );
  }
}
