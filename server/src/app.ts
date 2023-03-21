import { resolvers, typeDefs } from './graphql/schema';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import http from 'http';
 
export interface MyContext {
	token: string
}

export async function startApolloServer() {
const app = express();
const httpServer = http.createServer(app);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
	const server = new ApolloServer<MyContext>({
		typeDefs,
		resolvers,
	});

	await server.start();
	app.use('/graphql',cors(),express.json(),expressMiddleware(server,{
		context: async ({ req }) => {
			// Get the user token from the headers.
			const token = req.headers.authorization || '';
			// Add the user to the context
			return { token };
  		},
	}));

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/`);

}