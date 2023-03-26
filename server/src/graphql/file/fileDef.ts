export const fileTypeDefs = `#graphql

    scalar File
 
	type Mutation {
        uploadFile(id:ID!,file: File!): String!
      }

`;
