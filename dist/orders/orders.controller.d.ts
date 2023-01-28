import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './schema/orders.schema';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    getOrders(): Promise<any>;
    findById(id: string): Promise<Order>;
    receiveOrder(id: string): Promise<Order>;
    deliveryOrder(id: string): Promise<Order>;
    confirmOrderPayment(id: string): Promise<Order>;
    updateOrder(updateOrder: UpdateOrderDto): Promise<Order>;
    deleteOrder(id: string): Promise<Order>;
}
