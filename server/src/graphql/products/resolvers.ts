
import { MyContext } from '../../app';
import { Product } from '../../models/Product';
import { IProduct } from '../../interfaces/Product.interfaces';
import { isValidToken } from '../../services/jwt';
import { IUser } from '../../interfaces/User.interfaces';




 export const productResolvers = {
  Query: {
    products: async (_:any,_arg:any) => {
		return await Product.find({});
	}
  },
  Mutation: {
	addProduct: async (
		_:any,
		{
			title,
			description, 
			sku,
			img,
			qty, 
			price
		}:IProduct,
		{token}:MyContext
		):Promise<IProduct> => {

			if(!token) throw new Error('This Action is not Allowed');

			let user:IUser | null = null;

			try {
				user = await isValidToken(token);
			} catch (error) {
				throw new Error("Token are no valid");
			}

			if(user.role === "admin") throw new Error("This Action is not Allowed")


			const newProduct = Product.build({
					title,
					description,
					sku,
					img,
					qty,
					price
				});

				newProduct.save();
				return newProduct;

		},

		updateProduct: async (
			_:any,
			{
				id,
				title,
				description,
				qty,price}:IProduct,
				{token}:MyContext
				) => {
					
					if(!token) throw new Error('This Action is not Allowed');

					let user:IUser | null = null;

					try {
						user = await isValidToken(token);
					} catch (error) {
						throw new Error("Token are no valid");
					}

					if(user.role === "admin") throw new Error("This Action is not Allowed")

					const updatedProduct = await Product.findByIdAndUpdate(id,{
						title,
						description,
						qty,
						price
					},{
						new: true
					});

					if(!updatedProduct) throw new Error('User not found');
					return updatedProduct;
		},

		deleteProduct: async (
			_:any,
			{id}:IProduct,
			{token}:MyContext
			):Promise<IProduct> => {

				if(!token) throw new Error('Action not allowed');

				let user:IUser | null = null;

				try {
					user = await isValidToken(token);
				} catch (error) {
					throw new Error("Token are no valid");
				}

				if(user.role === "admin") throw new Error("This Action is not Allowed")

				const deletedProduct = await Product.findByIdAndDelete(id);

				if(!deletedProduct) throw new Error('Product not found');
				return deletedProduct;
		}

  	},
};
