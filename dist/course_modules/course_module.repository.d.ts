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
/// <reference types="mongoose/types/inferschematype" />
import { FilterQuery, Model } from 'mongoose';
import { UpdateCourseModuleDto } from './dto/course_module.dto';
import { CourseModule } from './schema/course_module.schema';
export declare class CourseModuleRepository {
    private CourseModuleModel;
    constructor(CourseModuleModel: Model<CourseModule>);
    findOne(id: string): Promise<CourseModule>;
    find(courseModuleFilterQuery: FilterQuery<CourseModule>): Promise<CourseModule[]>;
    create(courseModule: CourseModule): Promise<CourseModule>;
    Update(id: string, updateCourseModuleDto: UpdateCourseModuleDto): Promise<import("mongoose").Document<unknown, any, CourseModule> & CourseModule & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    Delete(id: string): Promise<import("mongoose").Document<unknown, any, CourseModule> & CourseModule & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
