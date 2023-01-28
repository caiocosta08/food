import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateOrderDto, CreateOrderDto } from './dto/order.dto';

import { Order, OrderDocument } from './schema/orders.schema';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
  ) {}

  async findOne(id: string): Promise<Order> {
    return this.OrderModel.findById(id).exec();
  }

  async find(ordersFilterQuery: FilterQuery<Order>): Promise<Order[]> {
    return this.OrderModel.find(ordersFilterQuery);
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const newOrder = new this.OrderModel(order);
    return newOrder.save();
  }

  async Update(id: string, updateOrderDto: UpdateOrderDto) {
    const filter = { _id: id };
    return this.OrderModel.findOneAndUpdate(filter, updateOrderDto, {
      new: true,
    });
  }

  async UpdateOrder(id: string, query: any) {
    const filter = { _id: id };
    return this.OrderModel.findOneAndUpdate(filter, query, {
      new: true,
    });
  }

  async Delete(id: string) {
    const deletar = this.OrderModel.findByIdAndDelete({ _id: id }).exec();

    return (await deletar).remove();
  }
}
