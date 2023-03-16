import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './graphql/schema';
import * as dotenv from 'dotenv';

dotenv.config();

export interface MyContext {
  token: string
}

export const startApolloServer = async () => {


	const server = new ApolloServer<MyContext>({
		typeDefs,
		resolvers
	});

	const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
		context: async ({ req }) => {
			// Get the user token from the headers.
			const token = req.headers.authorization || '';
			// Add the user to the context
			return { token };
  		},
	});

	console.log(`🚀  My Server ready at: ${url}`);

}