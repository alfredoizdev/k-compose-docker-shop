import Container from "@mui/material/Container";
import HeroBannerComponent from "../UI/Hero.component";
import NavbarComponent from "../UI/Navbar.component";
import { useLocation } from 'react-router-dom'
import { styled, Theme, CSSObject } from '@mui/material/styles';

interface LayoutMainProps {
	children: React.ReactElement
}

const Banner = styled("div")(({ theme }: { theme: Theme }): CSSObject => ({
	width: '100%',
	height: '150px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'white',
	fontSize: 20,
	textTransform: 'uppercase',
	background: theme.palette.primary.main,
	padding: '10px 10px',
}));

const LayoutMainComponent = ({ children }: LayoutMainProps) => {
	const { pathname } = useLocation();

	return (
		<main>
			<NavbarComponent />
			{pathname === '/home'
				? <HeroBannerComponent />
				: <Banner>{pathname.split('/')[1]}</Banner>
			}
			<Container sx={{ mt: 2 }}>
				{children}
			</Container >
		</main>

	);
}

export default LayoutMainComponent;