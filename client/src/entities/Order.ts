import Product from "./Product";

export default interface Order {
  count: number;
  productId: Product;
  orderDate: string;
}
