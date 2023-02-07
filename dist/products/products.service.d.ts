import { Product } from './schema/products.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsRepository } from './products.repository';
import { EventsGateway } from '../events/events.gateway';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly eventsGateway;
    constructor(productsRepository: ProductsRepository, eventsGateway: EventsGateway);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    updateProduct(productUpdates: UpdateProductDto): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteProduct(id: string): Promise<Product>;
    receiveProduct(id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deliveryProduct(id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    confirmProductPayment(id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
