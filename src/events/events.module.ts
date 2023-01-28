import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
