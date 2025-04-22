import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Attendance extends Document {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  present: boolean;

  @Prop()
  classId: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);