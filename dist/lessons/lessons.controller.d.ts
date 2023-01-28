import { LessonsService } from './lessons.service';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';
import { Lesson } from './schema/lessons.schema';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    getLessons(): Promise<any>;
    findById(id: string): Promise<Lesson>;
    updateUser(updateLesson: UpdateLessonDto): Promise<Lesson>;
    deleteLesson(id: string): Promise<Lesson>;
}
