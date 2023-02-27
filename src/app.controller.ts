import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { AppService } from './app.service';
import { IResponse } from './api';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IResponse {
    return this.appService.getHello();
  }
}
