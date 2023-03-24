import { IValidSizes } from '@/interfaces/Product.interfaces';
import {Schema, model, Model, Document } from 'mongoose';

interface IProductAttrs {
	title: string;
	sku: string;
	qty: string;
	img: string;
	price: string;
	description: string,
	slug: string,
	sizes: IValidSizes[],
}

interface IProductModel extends Model<IProductDoc> {
	build(attrs: IProductAttrs): IProductDoc;
}

interface IProductDoc extends Document {
	title: string;
	sku: string;
	qty: string;
	img: string;
	price: string;
	description: string,
	slug: string,
	sizes: IValidSizes[],
}

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	sku: {
		type: String,
	},
	price: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	qty: {
		type: String,
		default: "0",
	},
	role: {
		type: String,
        default: 'admin',
	},
	slug: { 
		type: String, 
		required: true, 
		unique: true,
	},
	img: {
		type: String, 
	},
	sizes: [
			{
				type: String,
				enum: {
					values: ["5", "6","6.5", "7", "7.5", "9", "10","10.5","11"],
					message: "{VALUE} is not allowed size",
				},
			},
		],

},{
	timestamps: true,
	toJSON: {
		transform(doc,ret) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.__v;
		}
	}
});


productSchema.statics.build = (attrs: IProductAttrs) => {
	return new Product(attrs);
}

const Product = model<IProductDoc, IProductModel>('Product',productSchema);

export { Product };