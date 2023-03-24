import Paper from '@mui/material/Paper';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import Icon from '@mui/material/Icon';
import Box from '@mui/system/Box';

import { theme } from '../../theme/theme';
import { RootState } from '../../app/store';
import { IMenu } from '../../interfaces/Menu.interfaces';
import { removeUser } from '../../app/features/user/userSlice';
import CartComponent from '../cart/Cart.component';


const menuData: IMenu[] = [
	{ title: "Home", href: "/home", role: "user", icon: "home" },
	{ title: "Products", href: "/products", role: "user", icon: "inventory_2" },
	{ title: "Login", href: "/login", role: "user", hiddentOnLogin: true, icon: "person" },
	{ title: "Create Account", href: "/create-account", role: "user", hiddentOnLogin: true, icon: "person_add" },
	{ title: "Admin Products", href: "/admin/products", role: "admin", icon: "view_comfy_alt" },
	{ title: "Admin Orders", href: '/admin/orders', role: "admin", icon: "list_alt" },
]

const Navbar = styled(Paper)(({ theme }: { theme: Theme }): CSSObject => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	boxShadow: 'none',
	background: 'white',
	borderRadius: 5,
	padding: '10px 10px',
}));

const Menu = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	button {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		&:first-of-type {
			margin-right: 5px;
		}
	}
`;

const Brand = styled('div')`
	font-size: 15px;
	cursor: pointer;
	
`;

const Button = styled("button")`
	border: none;
	background: transparent;
	padding: 5px;
	margin-left: 10px;
	svg {
		font-size: 30px;
	}
`;

const NavbarComponent = () => {

	const { role, name, id } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleOnClick = () => {
		setOpen(true);
	}

	const handleNavigation = (path: string) => {
		setOpen(false);
		navigate(path);
	}

	const handleLogOut = () => {
		dispatch(removeUser());
		localStorage.removeItem('token');
		setOpen(false);
	}

	return (
		<>
			<Container>
				<Navbar>
					<Brand onClick={() => navigate("/home")}>
						<h1>SHOESSHOP</h1>
					</Brand>
					<Menu>
						{name &&
							<Typography variant="h6">
								Hi {name}
							</Typography>
						}
						<CartComponent />
						<Button
							onClick={handleOnClick}
						>
							<MenuIcon />
						</Button>
					</Menu>
				</Navbar>
				<Drawer
					anchor={"right"}
					open={open}
					onClose={() => setOpen(false)}
				>
					<Box
						sx={{
							backgroundColor: theme.palette.primary.main,
							height: '100%'
						}}>
						<List sx={{ width: 250 }}>
							{
								menuData.filter(item => item.role === "user")
									.filter(item => id ? !item.hiddentOnLogin : item)
									.map((link) => (
										<ListItem key={link.title} disablePadding>
											<ListItemButton
												onClick={() => handleNavigation(link.href)}
											>

												{link?.icon &&
													<ListItemIcon
														sx={{
															minWidth: 0,
															mr: open ? 3 : 'auto',
															justifyContent: 'center',
															color: 'white',
														}}
													>
														<Icon>{link?.icon}</Icon>
													</ListItemIcon>
												}

												<ListItemText
													sx={{ color: 'white', fontWeight: 100, textTransform: "uppercase" }}
													primaryTypographyProps={{ fontSize: '18px' }}
													primary={link.title} />
											</ListItemButton>
										</ListItem>
									))
							}
							{role === "admin" &&
								<>
									<Divider />
									<Typography
										color="text.secondary"
										sx={{
											fontSize: 20,
											padding: 1.8,
											fontWeight: 100,
											color: 'white',
											textTransform: 'uppercase',
										}}
										variant="subtitle2">
										Admin
									</Typography>
									<Divider />
									{
										menuData.filter(item => item.role === "admin").map((link) => (
											<ListItem key={link.title} disablePadding>
												<ListItemButton
													onClick={() => handleNavigation(link.href)}
												>
													{link?.icon &&
														<ListItemIcon
															sx={{
																minWidth: 0,
																mr: open ? 3 : 'auto',
																justifyContent: 'center',
																color: 'white',
															}}
														>
															<Icon>{link?.icon}</Icon>
														</ListItemIcon>
													}


													<ListItemText
														sx={{ color: 'white', fontWeight: 100, textTransform: "uppercase" }}
														primaryTypographyProps={{ fontSize: '18px' }}
														primary={link.title} />
												</ListItemButton>
											</ListItem>
										))
									}
								</>
							}
							<ListItem disablePadding>
								<ListItemButton
									onClick={handleLogOut}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
											color: 'white',
										}}
									>
										<Icon>{"power_setting_new"}</Icon>
									</ListItemIcon>

									<ListItemText
										sx={{ color: 'white', fontWeight: 100, textTransform: "uppercase" }}
										primaryTypographyProps={{ fontSize: '18px' }}
										primary="Log Out" />
								</ListItemButton>
							</ListItem>

						</List>
					</Box>
				</Drawer>
			</Container>
		</>
	);
}

export default NavbarComponent;