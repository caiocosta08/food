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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const orders_schema_1 = require("./schema/orders.schema");
let OrdersRepository = class OrdersRepository {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async findOne(id) {
        return this.OrderModel.findById(id).exec();
    }
    async find(ordersFilterQuery) {
        return this.OrderModel.find(ordersFilterQuery);
    }
    async create(order) {
        const newOrder = new this.OrderModel(order);
        return newOrder.save();
    }
    async Update(id, updateOrderDto) {
        const filter = { _id: id };
        return this.OrderModel.findOneAndUpdate(filter, updateOrderDto, {
            new: true,
        });
    }
    async UpdateOrder(id, query) {
        const filter = { _id: id };
        return this.OrderModel.findOneAndUpdate(filter, query, {
            new: true,
        });
    }
    async Delete(id) {
        const deletar = this.OrderModel.findByIdAndDelete({ _id: id }).exec();
        return (await deletar).remove();
    }
};
OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(orders_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrdersRepository);
exports.OrdersRepository = OrdersRepository;
//# sourceMappingURL=orders.repository.js.map