import { Injectable } from '@nestjs/common';
import { IResponse } from './api';

@Injectable()
export class AppService {
  getHello(): IResponse {
    return { message: 'Hello World!' };
  }
}
