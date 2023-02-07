import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: '*:*' })
export class EventsGateway {
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

  async refreshOrders(orders: any) {
    this.server.emit('refresh_orders', orders);
    return true;
  }

  async refreshProducts(products: any) {
    console.log('refreshing...');
    this.server.emit('refresh_products', products);
    return true;
  }
}
