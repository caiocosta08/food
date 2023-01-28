import { Server, Socket } from 'socket.io';
export declare class EventsGateway {
    server: Server;
    coordinates: any;
    clients: any;
    findAll(data: any, client: Socket): {
        event: string;
    };
    identity(data: number, client: Socket): Promise<number>;
    refreshOrders(orders: any): Promise<boolean>;
    refreshProducts(products: any): Promise<boolean>;
}
