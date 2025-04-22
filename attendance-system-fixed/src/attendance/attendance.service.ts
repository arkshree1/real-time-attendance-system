import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from '../schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private readonly attendanceModel: Model<Attendance>,
  ) {}

  async markAttendance(studentId: string, classId: string): Promise<Attendance> {
    const attendance = new this.attendanceModel({ studentId, classId });
    return attendance.save();
  }
}
