// src/attendance/attendance.controller.ts
import { Controller, Get, Param } from '@nestjs/common';

@Controller('attendance') // Keep this EXACTLY like this
export class AttendanceController {
  
  @Get('status/:studentId') // Must have parameter name after colon
  getStatus(@Param('studentId') studentId: string) {
    return `Status for ${studentId}`;
  }
}