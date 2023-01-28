"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const courses_controller_1 = require("./courses.controller");
const courses_service_1 = require("./courses.service");
const database_module_1 = require("../database/database.module");
const lessons_repository_1 = require("../lessons/lessons.repository");
const course_module_repository_1 = require("../course_modules/course_module.repository");
const mongoose_1 = require("@nestjs/mongoose");
const courses_schema_1 = require("./schema/courses.schema");
const courses_repository_1 = require("./courses.repository");
const lessons_schema_1 = require("../lessons/schema/lessons.schema");
const course_module_schema_1 = require("../course_modules/schema/course_module.schema");
let CoursesModule = class CoursesModule {
};
CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([
                { name: courses_schema_1.Course.name, schema: courses_schema_1.CourseSchema },
                { name: course_module_schema_1.CourseModule.name, schema: course_module_schema_1.CourseModuleSchema },
                { name: lessons_schema_1.Lesson.name, schema: lessons_schema_1.LessonSchema },
            ]),
        ],
        controllers: [courses_controller_1.CoursesController],
        providers: [
            courses_service_1.CoursesService,
            courses_repository_1.CoursesRepository,
            lessons_repository_1.LessonsRepository,
            course_module_repository_1.CourseModuleRepository,
        ],
    })
], CoursesModule);
exports.CoursesModule = CoursesModule;
//# sourceMappingURL=courses.module.js.map