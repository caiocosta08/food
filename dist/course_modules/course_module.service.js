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
exports.CourseModuleService = void 0;
const common_1 = require("@nestjs/common");
const course_module_repository_1 = require("./course_module.repository");
let CourseModuleService = class CourseModuleService {
    constructor(courseModuleRepository) {
        this.courseModuleRepository = courseModuleRepository;
    }
    async create(createCourseModuleDto) {
        return this.courseModuleRepository
            .create(createCourseModuleDto)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll() {
        return this.courseModuleRepository.find({}).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findById(id) {
        return this.courseModuleRepository.findOne(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateCourseModule(courseModuleUpdates) {
        return this.courseModuleRepository
            .Update(courseModuleUpdates._id, courseModuleUpdates)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteUser(id) {
        return this.courseModuleRepository.Delete(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
CourseModuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_module_repository_1.CourseModuleRepository])
], CourseModuleService);
exports.CourseModuleService = CourseModuleService;
//# sourceMappingURL=course_module.service.js.map