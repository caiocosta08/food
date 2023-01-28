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
exports.CourseModuleController = void 0;
const common_1 = require("@nestjs/common");
const course_module_service_1 = require("./course_module.service");
const course_module_dto_1 = require("./dto/course_module.dto");
let CourseModuleController = class CourseModuleController {
    constructor(courseModuleService) {
        this.courseModuleService = courseModuleService;
    }
    async create(createCourseModuleDto) {
        return this.courseModuleService.create(createCourseModuleDto);
    }
    async getCourseModule() {
        return this.courseModuleService.findAll();
    }
    async findById(id) {
        return this.courseModuleService.findById(id);
    }
    async updateCourseModule(updateCourseModule) {
        return this.courseModuleService.updateCourseModule(updateCourseModule);
    }
    async deleteCourseModule(id) {
        return this.courseModuleService.deleteUser(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_module_dto_1.CreateCourseModuleDto]),
    __metadata("design:returntype", Promise)
], CourseModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseModuleController.prototype, "getCourseModule", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseModuleController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_module_dto_1.UpdateCourseModuleDto]),
    __metadata("design:returntype", Promise)
], CourseModuleController.prototype, "updateCourseModule", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseModuleController.prototype, "deleteCourseModule", null);
CourseModuleController = __decorate([
    (0, common_1.Controller)('modules'),
    __metadata("design:paramtypes", [course_module_service_1.CourseModuleService])
], CourseModuleController);
exports.CourseModuleController = CourseModuleController;
//# sourceMappingURL=course_module.controller.js.map