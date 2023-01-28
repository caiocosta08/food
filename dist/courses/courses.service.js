"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const courses_repository_1 = require("./courses.repository");
const course_module_repository_1 = require("../course_modules/course_module.repository");
const lessons_repository_1 = require("../lessons/lessons.repository");
let CoursesService = class CoursesService {
    constructor(coursesRepository, courseModulesRepository, lessonsRepository) {
        this.coursesRepository = coursesRepository;
        this.courseModulesRepository = courseModulesRepository;
        this.lessonsRepository = lessonsRepository;
    }
    async create(createCourseDto) {
        return this.coursesRepository.create(createCourseDto).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll() {
        return this.coursesRepository.find({}).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findById(id) {
        return this.coursesRepository.findOne(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getCourseInfo(id) {
        let modules = await this.courseModulesRepository.find({ course_id: id });
        const lessons = await this.lessonsRepository.find({ course_id: id });
        const course = await this.coursesRepository.findOne(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        modules = modules.map((m) => {
            m.lessons = lessons.filter((lesson) => lesson.module_id == m._id);
            return m;
        });
        return { course, modules, lessons };
    }
    async updateCourse(userUpdates) {
        return this.coursesRepository
            .Update(userUpdates._id, userUpdates)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteCourse(id) {
        return this.coursesRepository.Delete(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(course_module_repository_1.CourseModuleRepository)),
    __param(2, (0, common_1.Inject)(lessons_repository_1.LessonsRepository)),
    __metadata("design:paramtypes", [courses_repository_1.CoursesRepository,
        course_module_repository_1.CourseModuleRepository,
        lessons_repository_1.LessonsRepository])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map