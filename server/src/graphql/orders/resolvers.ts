
import { MyContext } from '../../app';
import { IOrder } from '../../interfaces/Order.interfaces';
import { Order } from '../../models/Order';
import Jwt from 'jsonwebtoken';


 export const orderResolvers = {
  Query: {
    orders: async (_:any,_arg:any):Promise<any> => {
		return await Order.find({})
			.populate("orderItems")
			.populate("user");
	}
  },
  Mutation: {
	addOrder: async (
		_:any,
		{
			user,
			numberOfItems,
			orderItems,
			subTotal,
			tax,
			total,
		}:IOrder,
		{token}:MyContext
		):Promise<IOrder> => {

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const decoded = Jwt.verify(token, process.env.SECRET_TOKEN!);

			console.log(decoded);

			const newOrder = Order.build({
				user,
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
			user,
			numberOfItems,
			orderItems,
			subTotal,
			tax,
			total,
		}:IOrder,{token}:MyContext) => {
			if(!token) throw new Error('Action not allowed');

			const updatedOrder = await Order.findByIdAndUpdate(user,{
				user,
				numberOfItems,
				orderItems,
				subTotal,
				tax,
				total,
			},{
				new: true
			});

			if(!updatedOrder) throw new Error('User not found');
			return updatedOrder;
		},

		deleteOrder: async (_:any,{id}:IOrder,{token}:MyContext):Promise<IOrder> => {
			if(!token) throw new Error('Action not allowed');

			const deletedOrder = await Order.findByIdAndDelete(id);

			if(!deletedOrder) throw new Error('Order not found');
			return deletedOrder;
		}
  	},
	

};
