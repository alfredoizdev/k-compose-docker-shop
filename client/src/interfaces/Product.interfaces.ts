export interface IProduct {
	id?: string;
	title: string;
	description: string;
	qty: string;
	sku: string;
	price: string;
	img: string;
	sizes: IValidSizes;
}

export interface IQueryProduct {
	products:IProduct[]
}

export type IValidSizes = "5" | "6" | "6.5" | "7" | "7.5" | "9" | "10" | "10.5" | "11";