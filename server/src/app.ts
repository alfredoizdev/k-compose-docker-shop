import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'

import * as dotenv from 'dotenv';
import { schema } from './graphql/schema';

dotenv.config();

process.env.NODE_ENV = 'development';

export type MyContext = {
	token: string;
}

export default function startApolloServer() {
	const yoga = createYoga({ 
		schema,
		context:  async ({ request }) => {
    		// get custom header value
    		const token = request.headers.get('authorization') ?? null
    		return { token }
  		}
	})
 
	// Pass it into a server to hook into request handlers.
	const server = createServer(yoga)
 
	// Start the server and you're done!
	server.listen(4000, () => {
	console.info('Server is running on http://localhost:4000/graphql')
	})
}
 
// export interface MyContext {
// 	token: string
// }

// export async function startApolloServer() {
// const app = express();
// const httpServer = http.createServer(app);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
	// const server = new ApolloServer<MyContext>({
	// 	typeDefs,
	// 	resolvers,
	// });

	// await server.start();
	// app.use('/graphql',cors(),express.json(),expressMiddleware(server,{
	// 	context: async ({ req }) => {
			// Get the user token from the headers.
			// const token = req.headers.authorization || '';
			// Add the user to the context
			// return { token };
//   		},
// 	}));

// 	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
// 	console.log(`🚀 Server ready at http://localhost:4000/`);

// }