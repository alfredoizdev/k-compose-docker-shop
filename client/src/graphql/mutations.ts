import { gql } from '@apollo/client'; 

export const M_LOGIN_USER = gql`
	mutation UserLogin(
		$email: String, 
		$password: String
	) {
  		userLogin(
			email: $email, 
			password: $password
		)
	}
`;

export const M_ADD_USER = gql`
	mutation AddUser(
		$name: String!, 
		$last: String!, 
		$email: String!, 
		$password: String!, 
		$role: String
	) {
  		addUser(
			name: $name, 
			last: $last, 
			email: $email, 
			password: $password, 
			role: $role
		)
	}

`;

export const M_ADD_PRODUCT = gql`
	mutation AddProduct(
		$description: String!
		$price: String!
		$qty: String!
		$slug: String!
		$title: String!
		$sku: String
	) {
  		addProduct(
			description: $description
			price: $price
			qty: $qty
			sku: $sku
			slug: $slug
			title: $title
		) {
			description,
			img,
			price,
			qty,
			sku,
			slug,
			title,
			id
		}
	}
`;

export const M_UPLOAD_FILE = gql`
	mutation uploadFile(
		$id: ID!
		$file: File!
	) {
  		uploadFile(
			id:$id
			file:$file
		)
	}
`;