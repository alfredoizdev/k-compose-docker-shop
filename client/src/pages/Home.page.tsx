import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import { theme } from '../theme/theme';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const Figure = styled('div')`
	overflow: hidden;
	border-radius: 5px;
	height: 90%;
	box-shadow: 0px 0px 13px 0px rgba(171,171,171,1);
	img {
		width: 100%;
	}
`;

const AboutUsCopy = styled('div')`
	margin-left: 30px;
`;

const AboutList = styled('div')`
	display: flex;
	width: 100%;
	margin-top: 20px;
`;

const FeaturedCopy = styled('div')`
	
	display: flex;
	padding: 24px 0;
	background: #181a1b;
	width: 100%;
	img {
		width: 100%;
	}
`;

const ButtonActions = styled('div')`
	display: flex;
	padding: 15px 0;
`;

const HomePage = () => {
	return (
		<>
			<Container sx={{ mt: 5 }}>
				<Grid2
					container
					justifyContent="center"
					alignContent="center"
					py={3}
				>
					<Grid2 xs={12} md={6}>
						<Figure>
							<img src="/img/img4.webp" alt="nikes shoes" />
						</Figure>
					</Grid2>
					<Grid2 xs={12} md={6}>
						<AboutUsCopy>
							<Typography
								variant="subtitle1"
								sx={{ color: theme.palette.primary.main }}
							>
								About Us
							</Typography>
							<Typography variant="h2" sx={{ fontSize: 45, fontWeight: 200 }}>
								Why buy sports shoes in our shop?
							</Typography>
							<AboutList>
								<Box>
									<Box>
										<Typography
											variant="h4"
											sx={{ color: theme.palette.primary.main }}
										>
											01
										</Typography>
										<Typography variant="subtitle1">
											We provide a wide range of brand shoes for men, women and kids.
										</Typography>
									</Box>
									<Box>
										<Typography
											variant="h4"
											sx={{ color: theme.palette.primary.main }}
										>
											02
										</Typography>
										<Typography variant="subtitle1">
											We provide a wide range of brand shoes for men, women and kids.
										</Typography>
									</Box>
								</Box>
								<Box>
									<Box>
										<Typography
											variant="h4"
											sx={{ color: theme.palette.primary.main }}
										>
											03
										</Typography>
										<Typography variant="subtitle1">
											We provide a wide range of brand shoes for men, women and kids.
										</Typography>
									</Box>
									<Box>
										<Typography
											variant="h4"
											sx={{ color: theme.palette.primary.main }}
										>
											04
										</Typography>
										<Typography variant="subtitle1">
											We provide a wide range of brand shoes for men, women and kids.
										</Typography>
									</Box>
								</Box>
							</AboutList>
						</AboutUsCopy>
					</Grid2>
				</Grid2>
			</Container>
			<FeaturedCopy>
				<Container>
					<Grid2 container py={3}>
						<Grid2 xs={12} md={6}>
							<Typography
								variant="subtitle1"
								sx={{ color: theme.palette.primary.main }}
							>
								Featured
							</Typography>
							<Typography
								variant="h2"
								sx={{
									fontSize: 45,
									fontWeight: 200,
									color: 'white'
								}}>
								You’ll like your new sneakers!
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{
									fontSize: 25,
									fontWeight: 200,
									color: theme.palette.primary.main,
								}}>
								Meet new brand sneakers, which fit for any weahter conditions and have a stylish design.
							</Typography>
							<ButtonActions>
								<Button
									color="primary"
									variant="contained"
									sx={{
										boxShadow: '0px 4px 48px 0px rgba(247,91,91,0.5)',
									}}
									fullWidth
								>Shop it</Button>
								<Button
									color="primary"
									variant="outlined"
									sx={{
										marginLeft: 1
									}}
									fullWidth
								>Review It</Button>
							</ButtonActions>
						</Grid2>
						<Grid2 xs={12} md={6}>
							<img src="/img/nike-red.webp" alt="nikes shoes" />
						</Grid2>
					</Grid2>
				</Container>
			</FeaturedCopy>
		</>
	);
}

export default HomePage;