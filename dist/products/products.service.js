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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
const events_gateway_1 = require("../events/events.gateway");
let ProductsService = class ProductsService {
    constructor(productsRepository, eventsGateway) {
        this.productsRepository = productsRepository;
        this.eventsGateway = eventsGateway;
    }
    async create(createProductDto) {
        console.log(createProductDto);
        const newProduct = await this.productsRepository
            .create(createProductDto)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshProducts(await this.findAll());
        return newProduct;
    }
    async findAll() {
        return this.productsRepository.find({}).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findById(id) {
        return this.productsRepository.findOne(id).catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateProduct(productUpdates) {
        return this.productsRepository
            .Update(productUpdates._id, productUpdates)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteProduct(id) {
        const deletedProduct = await this.productsRepository
            .Delete(id)
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshProducts(await this.findAll());
        return deletedProduct;
    }
    async receiveProduct(id) {
        const receivedProduct = await this.productsRepository
            .UpdateProduct(id, { status: 'product_received' })
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshProducts(await this.findAll());
        return receivedProduct;
    }
    async deliveryProduct(id) {
        const deliveredProduct = await this.productsRepository
            .UpdateProduct(id, { status: 'product_delivered' })
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshProducts(await this.findAll());
        return deliveredProduct;
    }
    async confirmProductPayment(id) {
        const confirmedProductPayment = await this.productsRepository
            .UpdateProduct(id, { payment_status: 'paid' })
            .catch((error) => {
            throw new common_1.HttpException({ error }, common_1.HttpStatus.BAD_REQUEST);
        });
        await this.eventsGateway.refreshProducts(await this.findAll());
        return confirmedProductPayment;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository,
        events_gateway_1.EventsGateway])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map