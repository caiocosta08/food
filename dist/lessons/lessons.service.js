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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const lessons_repository_1 = require("./lessons.repository");
let LessonsService = class LessonsService {
    constructor(lessonsRepository) {
        this.lessonsRepository = lessonsRepository;
    }
    async create(createLessonDto) {
        return this.lessonsRepository.create(createLessonDto).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll() {
        return this.lessonsRepository.find({}).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findById(id) {
        return this.lessonsRepository.findOne(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateLesson(lessonUpdates) {
        return this.lessonsRepository
            .Update(lessonUpdates._id, lessonUpdates)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteLesson(id) {
        return this.lessonsRepository.Delete(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lessons_repository_1.LessonsRepository])
], LessonsService);
exports.LessonsService = LessonsService;
//# sourceMappingURL=lessons.service.js.map