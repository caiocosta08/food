import { Item } from './item.dto';

export class CreateOrderDto {
  items: Item[];
  price: string;
  status: string;
  payment_status: string;
  client: string;
  payment_method: string;
  date: string;
  description: string;
  quantity: number;
}

export class UpdateOrderDto {
  _id: string;
  items: Item[];
  price: string;
  status: string;
  payment_status: string;
  client: string;
  payment_method: string;
  date: string;
  description: string;
  quantity: number;
}
