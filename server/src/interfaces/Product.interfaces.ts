export interface IProduct {
  id?: string;
  sizes: IValidSizes[];
  title: string;
  description: string;
  qty: string;
  sku: string;
  price: string;
  img: string;
  slug: string;
}

export type IValidSizes = '5' | '6' | '6.5' | '7' | '7.5' | '9' | '10' | '10.5' | '11';
