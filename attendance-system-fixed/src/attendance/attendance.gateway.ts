import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './attendance.schema';

@WebSocketGateway({ namespace: '/attendance' })
export class AttendanceGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    private redisService: RedisService,
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('subscribeToClass')
  handleSubscribe(
    @MessageBody() { classId }: { classId: string },
    @ConnectedSocket() client: Socket
  ) {
    if (!classId) {
      client.emit('error', 'Class ID is required');
      return;
    }

    client.join(classId); // ✅ Join the room
    client.emit('subscribed', `Subscribed to ${classId}`);
    console.log(`Client ${client.id} joined class: ${classId}`);
  }

  @SubscribeMessage('markAttendance')
  async handleMarkAttendance(
    @MessageBody() payload: {
      classId: string;
      studentId: string;
      studentName: string;
      present: boolean;
    }
  ) {
    const record = {
      ...payload,
      timestamp: new Date()
    };
  
    await Promise.all([
      this.redisService.set(`attendance:${payload.classId}:${payload.studentId}`, record, 86400),
      new this.attendanceModel(record).save()
    ]);
  
    this.server.to(payload.classId).emit('attendanceUpdate', record);
    return { success: true, studentName: payload.studentName };
  }
  
}
