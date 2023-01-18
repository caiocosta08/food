/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { Course } from './schema/courses.schema';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async getCourses(): Promise<any> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findById(id);
  }

  @Get('/get_course_info/:id')
  async getCourseInfo(@Param('id') id: string) {
    return this.coursesService.getCourseInfo(id);
  }

  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.updateCourse(id, updateCourse);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<Course> {
    return this.coursesService.deleteCourse(id);
  }
}
