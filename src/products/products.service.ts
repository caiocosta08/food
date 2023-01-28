/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './schema/products.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsRepository } from './products.repository';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log(createProductDto);
    const newProduct = await this.productsRepository
      .create(createProductDto)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshProducts(await this.findAll());
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({}).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findById(id: string): Promise<Product> {
    return this.productsRepository.findOne(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async updateProduct(productUpdates: UpdateProductDto) {
    return this.productsRepository
      .Update(productUpdates._id, productUpdates)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await this.productsRepository
      .Delete(id)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshProducts(await this.findAll());
    return deletedProduct;
  }

  async receiveProduct(id: string) {
    const receivedProduct = await this.productsRepository
      .UpdateProduct(id, { status: 'product_received' })
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshProducts(await this.findAll());
    return receivedProduct;
  }

  async deliveryProduct(id: string) {
    const deliveredProduct = await this.productsRepository
      .UpdateProduct(id, { status: 'product_delivered' })
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshProducts(await this.findAll());
    return deliveredProduct;
  }

  async confirmProductPayment(id: string) {
    const confirmedProductPayment = await this.productsRepository
      .UpdateProduct(id, { payment_status: 'paid' })
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshProducts(await this.findAll());
    return confirmedProductPayment;
  }
}
