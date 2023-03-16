import { orderResolvers } from './orders/resolvers';
import { productResolvers } from './products/resolvers';
import { orderTypeDefs } from './orders/orderDef';
import { productTypeDefs } from './products/productDef';
import { userResolvers } from './users/resolvers';
import { userTypeDefs } from './users/userDef';

const rootTypeDefs = `#graphql
	type Query {
		_: String
	}
`

export const resolvers = [
	orderResolvers,
	productResolvers,
	userResolvers
]

export const typeDefs = [
	rootTypeDefs, 
	orderTypeDefs,
	productTypeDefs,
	userTypeDefs
]