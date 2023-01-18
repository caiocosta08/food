import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Lesson } from 'src/lessons/schema/lessons.schema';

export type CourseModuleDocument = CourseModule & Document;

@Schema({ collection: 'module' })
export class CourseModule {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  course_id: string;
  @Prop({ required: false, default: [] })
  lessons?: Lesson[];
}

export const CourseModuleSchema = SchemaFactory.createForClass(CourseModule);
