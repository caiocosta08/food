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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_schema_1 = require("./schema/products.schema");
let ProductsRepository = class ProductsRepository {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }
    async findOne(id) {
        return this.ProductModel.findById(id).exec();
    }
    async findOneByQuery(query) {
        return this.ProductModel.findOne(query).exec();
    }
    async find(productsFilterQuery) {
        return this.ProductModel.find(productsFilterQuery);
    }
    async create(product) {
        const newProduct = new this.ProductModel(product);
        return newProduct.save();
    }
    async Update(id, updateProductDto) {
        const filter = { _id: id };
        return this.ProductModel.findOneAndUpdate(filter, updateProductDto, {
            new: true,
        });
    }
    async UpdateProduct(id, query) {
        const filter = { _id: id };
        return this.ProductModel.findOneAndUpdate(filter, query, {
            new: true,
        });
    }
    async Delete(id) {
        const deletar = this.ProductModel.findByIdAndDelete({ _id: id }).exec();
        return (await deletar).remove();
    }
};
ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsRepository);
exports.ProductsRepository = ProductsRepository;
//# sourceMappingURL=products.repository.js.map