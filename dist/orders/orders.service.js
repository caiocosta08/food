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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_repository_1 = require("./orders.repository");
const products_repository_1 = require("../products/products.repository");
const events_gateway_1 = require("../events/events.gateway");
let OrdersService = class OrdersService {
    constructor(ordersRepository, productsRepository, eventsGateway) {
        this.ordersRepository = ordersRepository;
        this.productsRepository = productsRepository;
        this.eventsGateway = eventsGateway;
    }
    async create(createOrderDto) {
        console.log(createOrderDto);
        const hasProducts = await Promise.all(createOrderDto.items.map(async (item) => {
            return await this.productsRepository.findOneByQuery({
                _id: item._id,
                quantity: { $gte: item.quantity },
            });
        }));
        if (hasProducts.filter((i) => i === null).length > 0)
            throw new common_1.HttpException({ error: 'Produto sem estoque' }, common_1.HttpStatus.BAD_REQUEST);
        const newOrder = await this.ordersRepository
            .create(createOrderDto)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        let x = await Promise.all(createOrderDto.items.map(async (item) => {
            const product = await this.productsRepository.findOne(item._id);
            return await this.productsRepository.UpdateProduct(item._id, {
                quantity: product.quantity - item.quantity,
            });
        }));
        await this.eventsGateway.refreshOrders(await this.findAll());
        return newOrder;
    }
    async findAll() {
        return this.ordersRepository.find({}).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findById(id) {
        return this.ordersRepository.findOne(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateOrder(orderUpdates) {
        return this.ordersRepository
            .Update(orderUpdates._id, orderUpdates)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteOrder(id) {
        const deletedOrder = await this.ordersRepository
            .Delete(id)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshOrders(await this.findAll());
        return deletedOrder;
    }
    async receiveOrder(id) {
        const receivedOrder = await this.ordersRepository
            .UpdateOrder(id, { status: 'order_received' })
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshOrders(await this.findAll());
        return receivedOrder;
    }
    async deliveryOrder(id) {
        const deliveredOrder = await this.ordersRepository
            .UpdateOrder(id, { status: 'order_delivered' })
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshOrders(await this.findAll());
        return deliveredOrder;
    }
    async confirmOrderPayment(id) {
        const confirmedOrderPayment = await this.ordersRepository
            .UpdateOrder(id, { payment_status: 'paid' })
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshOrders(await this.findAll());
        return confirmedOrderPayment;
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        products_repository_1.ProductsRepository,
        events_gateway_1.EventsGateway])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map