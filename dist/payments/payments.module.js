"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const payments_controller_1 = require("./payments.controller");
const payments_service_1 = require("./payments.service");
const mongoose_1 = require("@nestjs/mongoose");
const app_schema_1 = require("../app.schema");
const database_module_1 = require("../database/database.module");
const paid_payment_schema_1 = require("./schemas/paid-payment.schema");
const pending_payment_schema_1 = require("./schemas/pending-payment.schema");
let PaymentsModule = class PaymentsModule {
};
PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([{ name: app_schema_1.Log.name, schema: app_schema_1.LogSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: paid_payment_schema_1.PaidPayment.name, schema: paid_payment_schema_1.PaidPaymentsSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: pending_payment_schema_1.PendingPayment.name, schema: pending_payment_schema_1.PendingPaymentsSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: app_schema_1.Log.name, schema: app_schema_1.LogSchema }]),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL)
        ],
        controllers: [payments_controller_1.PaymentsController],
        providers: [payments_service_1.PaymentsService]
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payments.module.js.map