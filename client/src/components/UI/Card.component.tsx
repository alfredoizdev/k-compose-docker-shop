import { IProduct } from "../../interfaces/Product.interfaces";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { format } from "../../utils/currency";

interface CardComponentProps {
	product: IProduct
}

const CustomCard = styled('div')`
	width: 100%;
	box-shadow: '-1px 2px 8px 0px rgb(143 143 143 / 50%)';
	display: flex;
	flex-direction: column;
	padding: 5px;
	img {
		width: 100%;
		height: 300;
	}

`;

const CardComponent = ({ product }: CardComponentProps) => {
	return (
		<CustomCard>
			<img src={product.img || '/img/img6.webp'} alt={product.title} />
			<Typography
				variant="h5"
				component="div"
				sx={{ pt: 1 }}
			>
				{product?.title}
			</Typography>
			<Typography
				variant="subtitle1"
				color="text.secondary"
			>
				{product.description}
			</Typography>
			<Typography
				variant="subtitle1">
				{format(Number(product.price))}
			</Typography>
			<Button sx={{ mt: 1 }} variant="outlined">Shop It</Button>
		</CustomCard>
	);
}

export default CardComponent;
