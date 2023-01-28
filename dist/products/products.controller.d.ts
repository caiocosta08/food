import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './schema/products.schema';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    getProducts(): Promise<any>;
    findById(id: string): Promise<Product>;
    receiveProduct(id: string): Promise<Product>;
    deliveryProduct(id: string): Promise<Product>;
    confirmProductPayment(id: string): Promise<Product>;
    updateProduct(updateProduct: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
