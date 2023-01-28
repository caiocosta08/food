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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const app_schema_1 = require("../app.schema");
const paid_payment_schema_1 = require("./schemas/paid-payment.schema");
const pending_payment_schema_1 = require("./schemas/pending-payment.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("@nestjs/mongoose");
const mongoose_4 = require("@nestjs/mongoose");
let PaymentsService = class PaymentsService {
    constructor(logsModel, paidPaymentModel, pendingPaymentModel, connection) {
        this.logsModel = logsModel;
        this.paidPaymentModel = paidPaymentModel;
        this.pendingPaymentModel = pendingPaymentModel;
        this.connection = connection;
    }
    async create(log) {
        const createdLog = new this.logsModel(log);
        return createdLog.save().catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async createPendingPayment(pendingPayment) {
        const createdPendingPayment = new this.pendingPaymentModel(pendingPayment);
        return createdPendingPayment.save().catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async createPaidPayment(paidPayment) {
        const oldPaidPayment = await this.paidPaymentModel
            .find({ 'data.code': paidPayment.data.code })
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        if (oldPaidPayment.length > 0)
            return { message: 'Paid payment code already exists.' };
        const createdPaidPayment = new this.paidPaymentModel(paidPayment);
        return createdPaidPayment.save().catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async createCreditCardPendingPayment(pendingPayment) {
        const createdPendingPayment = new this.pendingPaymentModel(pendingPayment);
        return createdPendingPayment.save().catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async createCreditCardPaidPayment(paidPayment) {
        const createdPaidPayment = new this.paidPaymentModel(paidPayment);
        return createdPaidPayment.save().catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async createPixPayment(pixPayment) {
        if (pixPayment.data.status == 'pending') {
            const createdPendingPayment = new this.pendingPaymentModel(pixPayment);
            return createdPendingPayment.save().catch((error) => {
                throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
            });
        }
        else if (pixPayment.data.status == 'paid') {
            const createdPaidPayment = new this.paidPaymentModel(pixPayment);
            return createdPaidPayment.save().catch((error) => {
                throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
            });
        }
    }
    async getPaidPayments() {
        return this.paidPaymentModel
            .find()
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getPendingPayments() {
        return this.pendingPaymentModel
            .find()
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getCreditCardPayments() {
        const pendingPayments = await this.pendingPaymentModel
            .find({ 'data.payment_method': 'credit_card' })
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        const paidPayments = await this.paidPaymentModel
            .find({ 'data.payment_method': 'credit_card' })
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        return [...paidPayments, ...pendingPayments];
    }
    async getPixPayments() {
        const pendingPayments = await this.pendingPaymentModel
            .find({ 'data.payment_method': 'pix' })
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        const paidPayments = await this.paidPaymentModel
            .find({ 'data.payment_method': 'pix' })
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        return [...paidPayments, ...pendingPayments];
    }
    async deleteAllPendingPayments(params = null) {
        return this.pendingPaymentModel.remove(params).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteAllPaidPayments(params = null) {
        return this.paidPaymentModel.remove(params).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteAllPayments() {
        const pendingPaymentsDeleted = await this.pendingPaymentModel
            .remove()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        const paidPaymentsDeleted = await this.paidPaymentModel
            .remove()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        return { pendingPaymentsDeleted, paidPaymentsDeleted };
    }
    async getPaymentsWithParams(params = null) {
        const paidPayments = await this.paidPaymentModel
            .find(params)
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        const pendingPayments = await this.pendingPaymentModel
            .find(params)
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        return [...[paidPayments, ...pendingPayments]];
    }
    async getPaymentsData() {
        const paidPayments = await this.paidPaymentModel
            .find()
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        const pendingPayments = await this.pendingPaymentModel
            .find()
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        const paidPaymentsTotalValue = paidPayments
            .map((p) => p.data.amount)
            .reduce((a, b) => a + b, 0);
        const paidPaymentsQuantity = paidPayments.length;
        const pendingPaymentsTotalValue = pendingPayments
            .map((p) => p.data.amount)
            .reduce((a, b) => a + b, 0);
        const pendingPaymentsQuantity = pendingPayments.length;
        return {
            paidPaymentsTotalValue,
            paidPaymentsQuantity,
            pendingPaymentsTotalValue,
            pendingPaymentsQuantity,
        };
    }
    async findAll() {
        return this.logsModel
            .find()
            .exec()
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_4.InjectModel)(app_schema_1.Log.name)),
    __param(1, (0, mongoose_4.InjectModel)(paid_payment_schema_1.PaidPayment.name)),
    __param(2, (0, mongoose_4.InjectModel)(pending_payment_schema_1.PendingPayment.name)),
    __param(3, (0, mongoose_3.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_2.Connection])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map