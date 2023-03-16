
import { MyContext } from '../../app';
import { IOrder } from '../../interfaces/Order.interfaces';
import { Order } from '../../models/Order';
import { IUser } from '../../interfaces/User.interfaces';
import { isValidToken } from '../../services/jwt';


 export const orderResolvers = {
  Query: {
    orders: async (
		_:any,
		_arg:any,
		{token}:MyContext
		):Promise<any> => {


		if(!token) throw new Error('Action not allowed');

		let user:IUser | null = null;

		try {
			user = await isValidToken(token);
		} catch (error) {
			throw new Error("Token are no valid");
		}

		if(user?.role !== "admin") throw new Error("This action is not allowed")

		return await Order.find({})
			.populate("orderItems")
			.populate("user");
	}
  },
  Mutation: {
	addOrder: async (
		_:any,
		{
			numberOfItems,
			orderItems,
			subTotal,
			tax,
			total,
		}:IOrder,
		{token}:MyContext
		):Promise<IOrder> => {

		if(!token) throw new Error('This Action is not allowed');

		let user:IUser | null = null;

		try {
			user = await isValidToken(token);
		} catch (error) {
			throw new Error("Token are no valid");
		}

		if(!user.id) throw new Error('This Action is not allowed');

			const newOrder = Order.build({
				user: user.id,
				numberOfItems,
				orderItems,
				subTotal,
				tax,
				total,
			});

			newOrder.save();
			return newOrder;

		},

		updateOrder: async (
			_:any,{
			numberOfItems,
			orderItems,
			subTotal,
			tax,
			total,
		}:IOrder,{token}:MyContext) => {
			
			if(!token) throw new Error('This Action is not allowed');

			let user:IUser | null = null;

			try {
				user = await isValidToken(token);
			} catch (error) {
				throw new Error("Token are no valid");
			}

			if(!user?.id) throw new Error('This Action is not allowed');

			const updatedOrder = await Order.findByIdAndUpdate(user,{
				user: user.id,
				numberOfItems,
				orderItems,
				subTotal,
				tax,
				total,
			},{
				new: true
			});

			if(!updatedOrder) throw new Error('Order not found');
			return updatedOrder;
		},

		deleteOrder: async (
			_:any,
			{token}:MyContext):Promise<IOrder> => {
			
				if(!token) throw new Error('This Action is not allowed');

				let user:IUser | null = null;

				try {
					user = await isValidToken(token);
				} catch (error) {
					throw new Error("Token are no valid");
				}

				if(!user?.id) throw new Error('This Action is not allowed');

				const deletedOrder = await Order.findOneAndDelete({user: user.id});

				if(!deletedOrder) throw new Error('Order not found');
				return deletedOrder;
		}
  	},
	

};
