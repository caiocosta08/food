import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './schema/orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async getOrders(): Promise<any> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Get('receive_order/:id')
  async receiveOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.receiveOrder(id);
  }

  @Get('delivery_order/:id')
  async deliveryOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.deliveryOrder(id);
  }

  @Get('confirm_payment/:id')
  async confirmOrderPayment(@Param('id') id: string): Promise<Order> {
    return this.ordersService.confirmOrderPayment(id);
  }

  @Put()
  async updateOrder(@Body() updateOrder: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(updateOrder);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.deleteOrder(id);
  }
}
