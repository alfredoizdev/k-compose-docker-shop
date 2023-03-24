import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Cart = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

const CartItem = styled('div')`
	display: flex;
	justify-content: space-between;
	align-content: center;
	width: 100%;
	margin: 20px 0;

	@media (max-width: 768px) {
    	flex-direction: column;
  	}
`;

const Figure = styled('div')`
	img {
		width: 150px;
		height: auto;
	}
`;

const CartContent = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		margin-left: 20px;
	}

`;

const CartPage = () => {

	const cart = useSelector((state: RootState) => state.cart);

	console.log(cart);

	return (
		<Container sx={{ pt: 4 }}>
			<Cart>
				<CartItem>
					<CartContent>
						<Figure>
							<img src="/img/image-3.webp" alt="some product" />
						</Figure>
						<span>
							<Typography variant='h1'>
								Red shoes
							</Typography>
							<Typography variant='h2' color="primary">
								$99.00
							</Typography>
						</span>
					</CartContent>
					<Button
						color="secondary"
					>
						<DeleteOutline fontSize="large" />
					</Button>
				</CartItem>
				<CartItem>
					<CartContent>
						<Figure>
							<img src="/img/image1.webp" alt="some product" />
						</Figure>
						<span>
							<Typography variant='h1'>
								Blue shoes
							</Typography>
							<Typography variant='h2' color="primary">
								$99.00
							</Typography>
						</span>
					</CartContent>
					<Button
						color="secondary"
					>
						<DeleteOutline fontSize="large" />
					</Button>
				</CartItem>
			</Cart>
		</Container>
	);
}

export default CartPage;