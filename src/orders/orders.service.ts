/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from './schema/orders.schema';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    console.log(createOrderDto);
    const hasProducts = await Promise.all(
      createOrderDto.items.map(async (item) => {
        return await this.productsRepository.findOneByQuery({
          _id: item._id,
          quantity: { $gte: item.quantity },
        });
      }),
    );
    if (hasProducts.filter((i) => i === null).length > 0)
      throw new HttpException(
        { error: 'Produto sem estoque' },
        HttpStatus.BAD_REQUEST,
      );
    const newOrder = await this.ordersRepository
      .create(createOrderDto)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    let x = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productsRepository.findOne(item._id);
        return await this.productsRepository.UpdateProduct(item._id, {
          quantity: product.quantity - item.quantity,
        });
      }),
    );
    await this.eventsGateway.refreshOrders(await this.findAll());
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({}).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findById(id: string): Promise<Order> {
    return this.ordersRepository.findOne(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async updateOrder(orderUpdates: UpdateOrderDto) {
    return this.ordersRepository
      .Update(orderUpdates._id, orderUpdates)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async deleteOrder(id: string): Promise<Order> {
    const deletedOrder = await this.ordersRepository
      .Delete(id)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshOrders(await this.findAll());
    return deletedOrder;
  }

  async receiveOrder(id: string) {
    const receivedOrder = await this.ordersRepository
      .UpdateOrder(id, { status: 'order_received' })
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshOrders(await this.findAll());
    return receivedOrder;
  }

  async deliveryOrder(id: string) {
    const deliveredOrder = await this.ordersRepository
      .UpdateOrder(id, { status: 'order_delivered' })
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshOrders(await this.findAll());
    return deliveredOrder;
  }

  async confirmOrderPayment(id: string) {
    const confirmedOrderPayment = await this.ordersRepository
      .UpdateOrder(id, { payment_status: 'paid' })
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
    await this.eventsGateway.refreshOrders(await this.findAll());
    return confirmedOrderPayment;
  }
}
