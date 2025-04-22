import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AttendanceModule } from './attendance/attendance.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/socket.io*'], // Exclude WebSocket paths from static serving
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/attendance'),
    RedisModule,
    AttendanceModule,
  ],
})
export class AppModule {}