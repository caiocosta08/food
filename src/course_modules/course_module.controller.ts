import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseModuleService } from './course_module.service';
import {
  CreateCourseModuleDto,
  UpdateCourseModuleDto,
} from './dto/course_module.dto';
import { CourseModule } from './schema/course_module.schema';

@Controller('modules')
export class CourseModuleController {
  constructor(private readonly courseModuleService: CourseModuleService) {}

  @Post()
  async create(@Body() createCourseModuleDto: CreateCourseModuleDto) {
    return this.courseModuleService.create(createCourseModuleDto);
  }

  @Get()
  async getCourseModule(): Promise<any> {
    return this.courseModuleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CourseModule> {
    return this.courseModuleService.findById(id);
  }

  @Put()
  async updateCourseModule(
    @Body() updateCourseModule: UpdateCourseModuleDto,
  ): Promise<CourseModule> {
    return this.courseModuleService.updateCourseModule(updateCourseModule);
  }
  @Delete(':id')
  async deleteCourseModule(@Param('id') id: string): Promise<CourseModule> {
    return this.courseModuleService.deleteUser(id);
  }
}
