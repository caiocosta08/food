import { Lesson } from "src/lessons/schema/lessons.schema";
export declare class CreateCourseModuleDto {
    title: string;
    course_id: string;
    lessons?: Lesson[];
}
export declare class UpdateCourseModuleDto {
    _id?: string;
    title: string;
    course_id: string;
    lessons?: Lesson[];
}
