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
  }
}
`;