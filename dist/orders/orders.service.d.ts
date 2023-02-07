import { Order } from './schema/orders.schema';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';
import { EventsGateway } from '../events/events.gateway';
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly productsRepository;
    private readonly eventsGateway;
    constructor(ordersRepository: OrdersRepository, productsRepository: ProductsRepository, eventsGateway: EventsGateway);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: string): Promise<Order>;
    updateOrder(orderUpdates: UpdateOrderDto): Promise<Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOrder(id: string): Promise<Order>;
    receiveOrder(id: string): Promise<Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deliveryOrder(id: string): Promise<Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    confirmOrderPayment(id: string): Promise<Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
