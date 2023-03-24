import { useQuery } from '@apollo/client';
import LoadingComponent from '../components/UI/Loading.component';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import { GET_PRODUCTS } from '../graphql/queries';
import { IQueryProduct } from '../interfaces/Product.interfaces';
import CardComponent from '../components/UI/Card.component';
import Container from '@mui/material/Container';

const Main = styled('main')`
	
`;

const ProductPage = () => {

	const { data, loading, error } = useQuery<IQueryProduct>(GET_PRODUCTS);

	if (error) return <h2>Opps something went wrong!</h2>
	if (loading) return <LoadingComponent />
	if (!data) return <h2>Products not found</h2>

	const { products } = data;

	return (
		<Main>
			<Container>
				<Grid2 container py={5}>
					{products.map((product) => (
						<Grid2 key={product.id} xs={12} md={4} >
							<CardComponent product={product} />
						</Grid2>
					))}
				</Grid2>
			</Container>
		</Main>
	);
}

export default ProductPage;