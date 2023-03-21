import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#f75b5b'
		},
		secondary: {
			main: '#d81b60',
		},
	},
	components: {
		MuiTypography:{
			variants: [
				{
					props: {
						variant: "h1",
					},
					style: {
						fontSize: 26,
						fontWeight: 400
					}
				},
				{
					props: {
						variant: "h2",
					},
					style: {
						fontSize: 20,
						fontWeight: 400
					}
				},
				{
					props: {
						variant: "body1",
					},
					style: {
						fontSize: 11,
					}
				},
				{
					props: {
						variant: "body2",
					},
					style: {
						fontSize: 9,
					}
				},
			]
		}
	}
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});