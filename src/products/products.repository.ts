import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateProductDto, CreateProductDto } from './dto/product.dto';

import { Product, ProductDocument } from './schema/products.schema';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}

  async findOne(id: string): Promise<Product> {
    return this.ProductModel.findById(id).exec();
  }

  async findOneByQuery(query: FilterQuery<ProductDocument>): Promise<Product> {
    return this.ProductModel.findOne(query).exec();
  }

  async find(productsFilterQuery: FilterQuery<Product>): Promise<Product[]> {
    return this.ProductModel.find(productsFilterQuery);
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = new this.ProductModel(product);
    return newProduct.save();
  }

  async Update(id: string, updateProductDto: UpdateProductDto) {
    const filter = { _id: id };
    return this.ProductModel.findOneAndUpdate(filter, updateProductDto, {
      new: true,
    });
  }

  async UpdateProduct(id: string, query: any) {
    const filter = { _id: id };
    return this.ProductModel.findOneAndUpdate(filter, query, {
      new: true,
    });
  }

  async Delete(id: string) {
    const deletar = this.ProductModel.findByIdAndDelete({ _id: id }).exec();
    return (await deletar).remove();
  }
}
