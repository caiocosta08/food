export class CreateProductDto {
  title: string;
  price: number;
  quantity: number;
}
export class UpdateProductDto {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}
