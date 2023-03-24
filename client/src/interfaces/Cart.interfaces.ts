import { IValidSizes } from "./Product.interfaces";

export interface ICartProduct {
	id: string;
	image: string;
	price: number;
	size?: IValidSizes;
	slug: string;
	title: string;
	quantity: number;
}
