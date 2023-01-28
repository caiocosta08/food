"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModules_Module = void 0;
const common_1 = require("@nestjs/common");
const course_module_controller_1 = require("./course_module.controller");
const course_module_service_1 = require("./course_module.service");
const database_module_1 = require("../database/database.module");
const mongoose_1 = require("@nestjs/mongoose");
const course_module_schema_1 = require("./schema/course_module.schema");
const course_module_repository_1 = require("./course_module.repository");
let CourseModules_Module = class CourseModules_Module {
};
CourseModules_Module = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([
                { name: course_module_schema_1.CourseModule.name, schema: course_module_schema_1.CourseModuleSchema },
            ]),
        ],
        controllers: [course_module_controller_1.CourseModuleController],
        providers: [course_module_service_1.CourseModuleService, course_module_repository_1.CourseModuleRepository],
        exports: [course_module_repository_1.CourseModuleRepository]
    })
], CourseModules_Module);
exports.CourseModules_Module = CourseModules_Module;
//# sourceMappingURL=course_module.module.js.map