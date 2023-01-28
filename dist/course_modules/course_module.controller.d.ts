import { CourseModuleService } from './course_module.service';
import { CreateCourseModuleDto, UpdateCourseModuleDto } from './dto/course_module.dto';
import { CourseModule } from './schema/course_module.schema';
export declare class CourseModuleController {
    private readonly courseModuleService;
    constructor(courseModuleService: CourseModuleService);
    create(createCourseModuleDto: CreateCourseModuleDto): Promise<CourseModule>;
    getCourseModule(): Promise<any>;
    findById(id: string): Promise<CourseModule>;
    updateCourseModule(updateCourseModule: UpdateCourseModuleDto): Promise<CourseModule>;
    deleteCourseModule(id: string): Promise<CourseModule>;
}
