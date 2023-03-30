import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import {
	usePopupState,
	bindTrigger,
	bindMenu,
} from 'material-ui-popup-state/hooks';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { theme } from '../../theme/theme';
import { format } from '../../utils/currency';
import { useEffect } from 'react';
import { removeFromCart, setCartList } from '../../app/features/cart/cartSlice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CustomBadget = styled("div")`
	position: absolute;
	top: 0;
	right: 0;
	width: 25px;
	height: 25px;
	padding: 5px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid white;
`;

const CartCopy = styled("div")`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
`;

const CartAction = styled("div")`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;


const CartComponent = () => {

	const { cart } = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();
	const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

	useEffect(() => {
		if (localStorage.getItem('k-cart')) {
			const list = JSON.parse(localStorage.getItem('k-cart')!);
			dispatch(setCartList(list));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Button
				disableElevation
				sx={{
					border: 'none',
					background: 'transparent',
					marginLeft: '10px',
					padding: '5px',
					width: '15px',
					position: 'relative',
					"&:hover": { background: 'transparent' }
				}}
				variant="contained" {...bindTrigger(popupState)}>
				{cart?.length !== 0
					&& <CustomBadget
						sx={{
							background: theme.palette.primary.main,
						}}
					>{cart?.length}</CustomBadget>
				}
				<ShoppingBagOutlinedIcon
					sx={{ fontSize: '30px', color: 'black' }}
				/>
			</Button>

			<Menu
				{...bindMenu(popupState)}>
				<Box
					sx={{
						position: "relative"
					}}
				>
					{cart?.length
						? <List
							sx={{
								width: 320,
								height: 250,
								overflow: "auto",
							}}>

							{cart.map((product) => (
								<ListItemButton key={product.id} onClick={popupState.close}>
									<ListItemAvatar>
										{product.img
											? <Avatar
												sx={{ width: 56, height: 56, mr: 1 }}
												alt={product.title}
												src={product.img} />
											: <ImageIcon sx={{ fontSize: 30, mr: 1 }} />
										}
									</ListItemAvatar>
									<CartAction>
										<CartCopy>
											<Typography variant="subtitle1">{product.title}</Typography>
											<Typography variant="subtitle2">{format(Number(product.price))}</Typography>
										</CartCopy>
										<Button
											sx={{
												"&:hover": { backgroundColor: 'transparent' }
											}}
											onClick={() => dispatch(removeFromCart(product))}>
											<DeleteOutlineIcon />
										</Button>
									</CartAction>
								</ListItemButton>
							))}
						</List>
						: <Box
							onClick={popupState.close}
							sx={{
								width: 320,
								height: 250,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
								cursor: 'pointer',
							}}
						>
							<ProductionQuantityLimitsOutlinedIcon
								sx={{
									color: 'GrayText',
									fontSize: 35
								}}
							/>
							<Typography
								sx={{ color: 'GrayText' }}
								variant='h6'>
								Empty Cart
							</Typography>
						</Box>
					}
					{
						cart.length !== 0 &&
						<Box sx={{
							width: '1005',
							textAlign: "center",
							background: "#cccccc52",
							zIndex: 300,
							padding: 1,
							marginBottom: "-7px"
						}}>
							<Button variant='contained'>Checkout</Button>
						</Box>
					}
				</Box>
			</Menu>
		</>
	);
}

export default CartComponent;