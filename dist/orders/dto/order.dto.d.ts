import { UpdateProductDto } from '../../products/dto/product.dto';
export declare class CreateOrderDto {
    items: UpdateProductDto[];
    price: string;
    status: string;
    payment_status: string;
    client: string;
    payment_method: string;
    date: string;
    description: string;
    quantity: number;
}
export declare class UpdateOrderDto {
    _id: string;
    items: UpdateProductDto[];
    price: string;
    status: string;
    payment_status: string;
    client: string;
    payment_method: string;
    date: string;
    description: string;
    quantity: number;
}
