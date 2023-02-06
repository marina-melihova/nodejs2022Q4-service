import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.headers['content-type'] = 'application/json';

    const response = context.switchToHttp().getResponse();
    response.header['content-type'] = 'application/json';

    return next.handle();
  }
}
