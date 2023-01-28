/* eslint-disable prettier/prettier */
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { OrdersService } from '../orders/orders.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {

    // constructor(private readonly ordersService: OrdersService) { }
    @WebSocketServer()
    server: Server;
    coordinates: any = { latitude: -7.100719, longitude: -34.840522 };
    clients: any = [];

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.emit('events', 'test');
        return { event: 'events' };
    }

    @SubscribeMessage('subscribe')
    async identity(
        @MessageBody() data: number,
        @ConnectedSocket() client: Socket,
    ): Promise<number> {
        this.clients.push(client);
        return data;
    }

    // @SubscribeMessage('subscribe')
    async refreshOrders(orders: any) {
        // const orders = await this.ordersService.findAll();
        // this.server.emit('refresh_orders', orders)
        this.server.emit('refresh_orders', orders)
        return true
    }
}
