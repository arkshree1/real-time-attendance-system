import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  rollNumber: string;
}

export type StudentDocument = Student & Document;

export const StudentSchema = SchemaFactory.createForClass(Student);
