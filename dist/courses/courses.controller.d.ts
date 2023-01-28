import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { Course } from './schema/courses.schema';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    getCourses(): Promise<any>;
    findById(id: string): Promise<Course>;
    getCourseInfo(id: string): Promise<{
        course: Course;
        modules: import("../course_modules/schema/course_module.schema").CourseModule[];
        lessons: import("../lessons/schema/lessons.schema").Lesson[];
    }>;
    updateCourse(updateCourse: UpdateCourseDto): Promise<Course>;
    deleteCourse(id: string): Promise<Course>;
}
