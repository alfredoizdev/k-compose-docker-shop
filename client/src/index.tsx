import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';

import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import CssBaseline from '@mui/material/CssBaseline'



const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<ApolloProvider client={client}>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</ApolloProvider>
);
