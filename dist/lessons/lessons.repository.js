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
exports.LessonsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lessons_schema_1 = require("./schema/lessons.schema");
let LessonsRepository = class LessonsRepository {
    constructor(LessonModel) {
        this.LessonModel = LessonModel;
    }
    async findOne(id) {
        return this.LessonModel.findById(id).exec();
    }
    async find(lessonsFilterQuery) {
        return this.LessonModel.find(lessonsFilterQuery);
    }
    async create(lesson) {
        const newLesson = new this.LessonModel(lesson);
        return newLesson.save();
    }
    async Update(id, updateLessonDto) {
        const filter = { _id: id };
        return this.LessonModel.findOneAndUpdate(filter, updateLessonDto, {
            new: true,
        });
    }
    async Delete(id) {
        const deletar = this.LessonModel.findByIdAndDelete({ _id: id }).exec();
        return (await deletar).remove();
    }
};
LessonsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lessons_schema_1.Lesson.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LessonsRepository);
exports.LessonsRepository = LessonsRepository;
//# sourceMappingURL=lessons.repository.js.map