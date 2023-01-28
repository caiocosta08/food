/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Course } from './schema/courses.schema';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { CoursesRepository } from './courses.repository';
import { CourseModuleRepository } from '../course_modules/course_module.repository';
import { LessonsRepository } from '../lessons/lessons.repository';
export declare class CoursesService {
    private readonly coursesRepository;
    private readonly courseModulesRepository;
    private readonly lessonsRepository;
    constructor(coursesRepository: CoursesRepository, courseModulesRepository: CourseModuleRepository, lessonsRepository: LessonsRepository);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(): Promise<Course[]>;
    findById(id: string): Promise<Course>;
    getCourseInfo(id: string): Promise<{
        course: Course;
        modules: import("../course_modules/schema/course_module.schema").CourseModule[];
        lessons: import("../lessons/schema/lessons.schema").Lesson[];
    }>;
    updateCourse(userUpdates: UpdateCourseDto): Promise<Course & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteCourse(id: string): Promise<Course>;
}
