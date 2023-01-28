import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreateProductDto } from '../dto/product.dto';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({ required: false, default: '' })
  title: string;
  @Prop({ required: false, default: 0 })
  price: number;
  @Prop({ required: false, default: 0 })
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
