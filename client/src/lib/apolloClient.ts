import { createUploadLink } from 'apollo-upload-client'

import {
	ApolloClient,
	InMemoryCache,
} from '@apollo/client';

const token = localStorage.getItem('token') || '';

const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:4000/graphql',
		headers: {
			'Apollo-Require-Preflight': 'true',
			"Content-Type": "application/json",
			Authorization: token,
		}
	}),
	cache: new InMemoryCache(),
});

export default client;