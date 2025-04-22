import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()  // Simple root route - no parameters
  getHello(): string {
    return 'Attendance System API';
  }
} 