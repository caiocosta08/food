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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const axios_1 = require("axios");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async test() {
        return true;
    }
    async postback(data) {
        if (data.type == 'charge.paid' && data.data.status == 'paid') {
            await this.paymentsService.createPaidPayment(data);
            await this.paymentsService.deleteAllPendingPayments({
                'data.code': data.data.code,
            });
        }
        if (data.type == 'order.paid' &&
            data.data.status == 'paid' &&
            data.data.payment_method == 'pix') {
            await this.paymentsService.createPaidPayment(data);
            await this.paymentsService.deleteAllPendingPayments({
                'data.code': data.data.code,
            });
        }
    }
    async createCreditCardOrder(data) {
        const options = {
            method: 'POST',
            url: 'https://api.pagar.me/core/v5/orders',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic ' + process.env.PAGARME_API_KEY,
            },
            data: {
                items: data.items,
                customer: data.customer,
                payments: data.payments,
            },
        };
        const response = await axios_1.default.request(options);
        if (response.data.status == 'paid')
            await this.paymentsService.createCreditCardPaidPayment(response);
        if (response.data.status != 'paid')
            await this.paymentsService.createCreditCardPendingPayment(response);
        return response.data;
    }
    async createPixOrder(data) {
        const options = {
            method: 'POST',
            url: 'https://api.pagar.me/core/v5/orders',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic ' + process.env.PAGARME_API_KEY,
            },
            data: {
                items: data.items,
                customer: data.customer,
                payments: data.payments,
            },
        };
        const response = await axios_1.default.request(options);
        if (response.data) {
            await this.paymentsService.createPixPayment(response);
            return response.data;
        }
        else
            return { error: response };
    }
    async getPaidPayments() {
        const payments = await this.paymentsService.getPaidPayments();
        return payments;
    }
    async getPendingPayments() {
        const payments = await this.paymentsService.getPendingPayments();
        return payments;
    }
    async getCreditCardPayments() {
        const payments = await this.paymentsService.getCreditCardPayments();
        return payments;
    }
    async getPixPayments() {
        const payments = await this.paymentsService.getPixPayments();
        return payments;
    }
    async getPaymentsWithParams() {
        const payments = await this.paymentsService.getPaymentsWithParams({
            'data.payment_method': 'pix',
        });
        return payments;
    }
    async getPaymentsData() {
        const payments = await this.paymentsService.getPaymentsData();
        return payments;
    }
    async deleteAllPendingPayments() {
        const payments = await this.paymentsService.deleteAllPendingPayments();
        return payments;
    }
    async deleteAllPaidPayments() {
        const payments = await this.paymentsService.deleteAllPaidPayments();
        return payments;
    }
    async deleteAllPayments() {
        const payments = await this.paymentsService.deleteAllPayments();
        return payments;
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('postback'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "postback", null);
__decorate([
    (0, common_1.Post)('create_credit_card_order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createCreditCardOrder", null);
__decorate([
    (0, common_1.Post)('create_pix_order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createPixOrder", null);
__decorate([
    (0, common_1.Get)('get_paid_payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaidPayments", null);
__decorate([
    (0, common_1.Get)('get_pending_payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPendingPayments", null);
__decorate([
    (0, common_1.Get)('get_credit_card_payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getCreditCardPayments", null);
__decorate([
    (0, common_1.Get)('get_pix_payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPixPayments", null);
__decorate([
    (0, common_1.Get)('get_payments_with_params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentsWithParams", null);
__decorate([
    (0, common_1.Get)('get_payments_data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentsData", null);
__decorate([
    (0, common_1.Get)('delete_all_pending_payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "deleteAllPendingPayments", null);
__decorate([
    (0, common_1.Get)('delete_all_paid_payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "deleteAllPaidPayments", null);
__decorate([
    (0, common_1.Get)('delete_all_payments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "deleteAllPayments", null);
PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map