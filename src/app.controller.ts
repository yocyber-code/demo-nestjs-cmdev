import {
  Controller,
  Get,
  MethodNotAllowedException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    throw new MethodNotAllowedException();
    // return this.appService.getHello();
  }
}
