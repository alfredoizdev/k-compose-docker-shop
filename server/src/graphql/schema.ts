import { createSchema } from 'graphql-yoga';
import { orderResolvers } from './orders/resolvers';
import { productResolvers } from './products/resolvers';
import { orderTypeDefs } from './orders/orderDef';
import { productTypeDefs } from './products/productDef';
import { userResolvers } from './users/resolvers';
import { userTypeDefs } from './users/userDef';
import { signinResolvers } from './signin/resolvers';
import { siginDef } from './signin/signinDef';
import { fileTypeDefs } from './file/fileDef';
import { fileResolvers } from './file/resolvers';

const rootTypeDefs = `#graphql
	type Query {
		_: String
	}
`;

export const resolvers = [orderResolvers, productResolvers, userResolvers, signinResolvers, fileResolvers];

export const typeDefs = [rootTypeDefs, orderTypeDefs, productTypeDefs, userTypeDefs, siginDef, fileTypeDefs];

export const schema = createSchema({
  typeDefs,
  resolvers,
});
