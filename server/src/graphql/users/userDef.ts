export const userTypeDefs = `#graphql

	type User {
		id: ID
		name: String
		last: String
		email:String
		role: String
		password: String
	}

	extend type Query {
		users: [User]
		getCurrentUser: User
	}

	type Mutation {
  		addUser(
			name: String!
			last: String! 
			email: String! 
			password: String! 
			role: String
		): String

		updateUser(
			name: String, 
			last: String,
			email: String,
		): User

		deleteUser(id:ID!): User
	}
`;
