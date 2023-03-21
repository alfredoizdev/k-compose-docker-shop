import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Main = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
	width: '100%'
}));


const NotFoundPage = () => {
	return (
		<Main>
			<Grid container>
				<Grid
					sx={{ height: '100vh', width: '100%' }}
					display={"flex"}
					justifyContent="center"
					alignItems="center"
					item
				>
					<Typography sx={{ color: 'white' }} variant="h2" component={"h2"}>
						Page not found |
					</Typography>
					<Typography sx={{ color: "#9e9e9e", marginLeft: 1 }} variant="h2" component={"h2"}>
						404
					</Typography>
				</Grid>
			</Grid>
		</Main>
	);
};


export default NotFoundPage