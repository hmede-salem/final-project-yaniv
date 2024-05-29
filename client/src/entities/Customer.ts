import Order from "./Order";

export default interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  creationDate: string;
  orders: Order[];
}
