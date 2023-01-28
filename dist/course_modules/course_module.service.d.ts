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
import { CourseModule } from './schema/course_module.schema';
import { CreateCourseModuleDto, UpdateCourseModuleDto } from './dto/course_module.dto';
import { CourseModuleRepository } from './course_module.repository';
export declare class CourseModuleService {
    private readonly courseModuleRepository;
    constructor(courseModuleRepository: CourseModuleRepository);
    create(createCourseModuleDto: CreateCourseModuleDto): Promise<CourseModule>;
    findAll(): Promise<CourseModule[]>;
    findById(id: string): Promise<CourseModule>;
    updateCourseModule(courseModuleUpdates: UpdateCourseModuleDto): Promise<import("mongoose").Document<unknown, any, CourseModule> & CourseModule & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteUser(id: string): Promise<CourseModule>;
}
