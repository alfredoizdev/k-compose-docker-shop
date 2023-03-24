import HeroBannerComponent from "../UI/Hero.component";
import NavbarComponent from "../UI/Navbar.component";
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { Q_GET_CURRENT_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { addUser } from "../../app/features/user/userSlice";
import LoadingComponent from "../UI/Loading.component";

interface LayoutMainProps {
	children: React.ReactElement
}

const Banner = styled("div")`
	width: 100%;
	text-transform: uppercase;
	background-image: url(/img/img4.webp);
	background-size: cover;
	background-repeat: no-repeat;
	height: 260px;
	background-position: center;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #1212124f;
		width: 100%;
		height: 100%;
		color: white;
	}
`;


const LayoutMainComponent = ({ children }: LayoutMainProps) => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const { loading, data } = useQuery(Q_GET_CURRENT_USER);

	if (loading) return <LoadingComponent />

	dispatch(addUser(data?.getCurrentUser));


	return (
		<main>
			<NavbarComponent />
			{pathname === '/home'
				? <HeroBannerComponent />
				: <Banner>
					<div>
						<Typography variant="h1">
							{pathname.split('/')[1]}
						</Typography>
					</div>
				</Banner>
			}
			{children}
		</main>

	);
}

export default LayoutMainComponent;