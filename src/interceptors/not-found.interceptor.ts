import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    {
      const ctx = context.switchToHttp();
      const { method } = ctx.getRequest();

      return next.handle().pipe(
        tap((data) => {
          if (method !== 'DELETE' && !data) {
            throw new NotFoundException('Entity not found');
          }
        }),
      );
    }
  }
}
