import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';

import * as dotenv from 'dotenv';
import { schema } from './graphql/schema';
import AWS from 'aws-sdk';

dotenv.config();

process.env.NODE_ENV = 'development';

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  params: { Bucket: process.env.BUCKET_NAME },
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1',
});

export type MyContext = {
  token: string;
};

export default function startApolloServer() {
  const yoga = createYoga({
    schema,
    context: async ({ request }) => {
      // get custom header value
      const token = request.headers.get('authorization') ?? null;
      return { token };
    },
  });

  // Pass it into a server to hook into request handlers.
  const server = createServer(yoga);

  // Start the server and you're done!
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });
}
