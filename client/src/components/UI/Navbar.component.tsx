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

const menuData = [
	{ title: "Home", href: "/home" },
	{ title: "Products", href: "/products" }
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
`;

const Brand = styled('div')`
	font-size: 15px;
	
`;

const Button = styled("button")`
	border: none;
	background: transparent;
	padding: 5px;
	svg {
		font-size: 30px;
	}
`;

const NavbarComponent = () => {
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
							menuData.map((link) => (
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
						<Divider />
					</List>
				</Drawer>
			</Container>
		</>
	);
}

export default NavbarComponent;