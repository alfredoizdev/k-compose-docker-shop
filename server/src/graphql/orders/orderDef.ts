export const orderTypeDefs = `#graphql

	input ProductInput {
		porductId: ID
	}

	type Order {
		user: User
		orderItems: [Product]
		numberOfItems: Int
		subTotal: Int
		tax: Int
		total: Int
	}

	extend type Query {
		orders: [Order]
	}

	type Mutation {
  		addOrder(
			orderItems: [String]!
			numberOfItems: Int!
			subTotal: Int!
			tax: Int!
			total: Int!
			): Order

		updateOrder(
			orderItems: [ProductInput]
			numberOfItems: Int
			subTotal: Int
			tax: Int
			total: Int
			): Order

		deleteOrder(id:ID!): Order
	}
`;