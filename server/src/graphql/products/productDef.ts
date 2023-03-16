
export const productTypeDefs = `#graphql

	type Product {
		id: ID
		title: String
		description: String
		qty: String
		price: String
		img: String
		sku: String
	}

	extend type Query {
		products: [Product]
	}

	type Mutation {
  		addProduct(
			title: String!, 
			description: String!, 
			qty: String!, 
			price: String!, 
			img: String!
			sku: String!
			): Product

		updateProduct(
			id: ID!
			title: String, 
			description: String, 
			qty: String, 
			price: String, 
			img: String,
			sku: String
			): Product

		deleteProduct(id:ID!): Product
	}
`;