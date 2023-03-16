import {Schema, model, Model, Document } from 'mongoose';

interface IProductAttrs {
	title: string;
	sku: string;
	qty: string;
	img: string;
	price: string;
	description: string,
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
}

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	sku: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		require: true,
	},
	qty: {
		type: String,
		default: "0"
	},
	role: {
		type: String,
        default: 'admin'
	},

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