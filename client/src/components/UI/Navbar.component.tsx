import Paper from '@mui/material/Paper';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import { IMenu } from '../../interfaces/Menu.interfaces';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store';


const menuData: IMenu[] = [
	{ title: "Home", href: "/home", role: "user" },
	{ title: "Products", href: "/products", role: "user" },
	{ title: "Login", href: "/login", role: "user" },
	{ title: "Create Account", href: "/create-account", role: "user" },
	{ title: "Admin Products", href: "/admin/products", role: "admin" },
	{ title: "Admin Orders", href: '/admin/orders', role: "admin" },
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
	
`;

const Button = styled("button")`
	border: none;
	background: transparent;
	padding: 5px;
	background: #ececec;
	border-radius: 50%;
	margin-left: 10px;
	svg {
		font-size: 30px;
	}
`;

const NavbarComponent = () => {
	const { role, name } = useSelector((state: RootState) => state.user)
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleOnClick = () => {
		console.log("here")
		setOpen(true);
	}

	const handleNavigation = (path: string) => {
		setOpen(false);
		navigate(path);
	}

	return (
		<>
			<Container>
				<Navbar>
					<Brand>
						<h1>SHOESSHOP</h1>
					</Brand>
					<Menu>
						{name &&
							<Typography variant="h6">
								Hi {name}
							</Typography>
						}
						<Button onClick={() => navigate("/cart")}>
							<ShoppingBagOutlinedIcon />
						</Button>
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
					<List sx={{ width: 250 }}>
						{
							menuData.filter(item => item.role === "user").map((link) => (
								<ListItem key={link.title} disablePadding>
									<ListItemButton
										onClick={() => handleNavigation(link.href)}
									>
										<ListItemText
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
										fontSize: 18,
										padding: 1.8,
										fontWeight: 800
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
												<ListItemText
													primaryTypographyProps={{ fontSize: '18px' }}
													primary={link.title} />
											</ListItemButton>
										</ListItem>
									))
								}
							</>
						}

					</List>
				</Drawer>
			</Container>
		</>
	);
}

export default NavbarComponent;