import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceGateway } from './attendance.gateway';
import { Attendance, AttendanceSchema } from './attendance.schema';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attendance.name, schema: AttendanceSchema }]),
    RedisModule, // This imports RedisService
  ],
  providers: [AttendanceGateway],
})
export class AttendanceModule {}