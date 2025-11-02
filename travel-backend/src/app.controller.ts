import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('notifications/count')
  getNotificationCount() {
    return { count: 0 };
  }

  @Get('notifications')
  getNotifications() {
    return [];
  }
}
