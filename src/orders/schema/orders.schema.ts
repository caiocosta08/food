import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item } from '../dto/item.dto';

export type OrderDocument = Order & Document;

@Schema({ collection: 'orders' })
export class Order {
  @Prop({ required: true, default: [] })
  items: Item[];
  @Prop({ required: true })
  price: string;
  @Prop({ required: true, default: 'pendente' })
  status: string;
  @Prop({ required: true, default: 'pendente' })
  payment_status: string;
  @Prop({ required: true })
  client: string;
  @Prop({ required: true, default: 'pix' })
  payment_method: string;
  @Prop({ required: false, default: new Date() })
  date: string;
  @Prop({ required: false, default: '' })
  description: string;
  @Prop({ required: false, default: 0 })
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
