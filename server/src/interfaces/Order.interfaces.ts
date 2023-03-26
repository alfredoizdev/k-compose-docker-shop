import { IProduct } from './Product.interfaces';

export interface IOrder {
  user: string;
  orderItems: IProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  id?: string;
}
