import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('content-type', 'application/json')
  @ApiOkResponse({ description: 'Health checked, hello world returned.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
