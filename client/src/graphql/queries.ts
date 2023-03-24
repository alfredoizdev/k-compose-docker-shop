import { gql } from '@apollo/client'; 
 
export const UPLOAD_FILE = gql` 
mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export const GET_PRODUCTS = gql` 
query Products {
  products {
    img
    id
    title
	description
	price
	slug
	sizes
  }
}
`;

export const Q_GET_CURRENT_USER = gql`
query GetCurrentUser {
  getCurrentUser {
    id
    name
    last
    role
  }
}
`;

export const Q_GET_ORDERS = gql`
query Orders {
  orders {
	id
    subTotal
    tax
   	total
   	numberOfItems
  }
}
`;