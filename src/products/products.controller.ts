import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './schema/products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }

  @Get()
  async getProducts(): Promise<any> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Get('receive_product/:id')
  async receiveProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.receiveProduct(id);
  }

  @Get('delivery_product/:id')
  async deliveryProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deliveryProduct(id);
  }

  @Get('confirm_payment/:id')
  async confirmProductPayment(@Param('id') id: string): Promise<Product> {
    return this.productsService.confirmProductPayment(id);
  }

  @Put()
  async updateProduct(
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(updateProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
