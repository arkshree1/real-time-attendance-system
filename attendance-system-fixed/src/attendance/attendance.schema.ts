import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Attendance extends Document {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  studentName: string;

  @Prop({ required: true })
  classId: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true }) // removed default: true
  present: boolean;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
