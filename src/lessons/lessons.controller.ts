import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';
import { Lesson } from './schema/lessons.schema';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  async getLessons(): Promise<any> {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateLesson: UpdateLessonDto,
  ): Promise<Lesson> {
    return this.lessonsService.updateLesson(id, updateLesson);
  }

  @Delete(':id')
  async deleteLesson(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.deleteLesson(id);
  }
}
