"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const dotenv = require("dotenv");
const database_module_1 = require("./database/database.module");
const app_schema_1 = require("./app.schema");
const payments_module_1 = require("./payments/payments.module");
const courses_module_1 = require("./courses/courses.module");
const course_module_module_1 = require("./course_modules/course_module.module");
const lessons_module_1 = require("./lessons/lessons.module");
const users_module_1 = require("./users/users.module");
const orders_module_1 = require("./orders/orders.module");
const events_module_1 = require("./events/events.module");
const products_module_1 = require("./products/products.module");
dotenv.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([{ name: app_schema_1.Log.name, schema: app_schema_1.LogSchema }]),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL),
            payments_module_1.PaymentsModule,
            courses_module_1.CoursesModule,
            course_module_module_1.CourseModules_Module,
            lessons_module_1.LessonsModule,
            users_module_1.UsersModule,
            orders_module_1.OrdersModule,
            events_module_1.EventsModule,
            products_module_1.ProductsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map