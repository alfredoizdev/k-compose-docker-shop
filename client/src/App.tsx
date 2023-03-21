import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home.page';
import ProductPage from './pages/Product.page';
import LayoutMainComponent from './components/Layout/LayoutMain.component';
import NotFoundPage from './pages/NotFound.page';

function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={
						<LayoutMainComponent>
							<HomePage />
						</LayoutMainComponent>
					} />
					<Route path='/products' element={
						<LayoutMainComponent>
							<ProductPage />
						</LayoutMainComponent>} />
					<Route path='/home' element={
						<LayoutMainComponent>
							<HomePage />
						</LayoutMainComponent>
					} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
