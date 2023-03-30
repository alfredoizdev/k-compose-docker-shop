import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home.page';
import ProductPage from './pages/Product.page';
import LayoutMainComponent from './components/Layouts/LayoutMain.component';
import NotFoundPage from './pages/NotFound.page';
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import OnlyAdminGuardComponent from "./guard/OnlyAdmin.guard";
import ProductAdminPage from './pages/admin/ProductAdmin.page';
import LayoutAdminComponent from "./components/Layouts/LayoutAdmin.component";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import CartPage from "./pages/Cart.page";

function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={
						<Navigate to="/home" />
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
					<Route path='/cart' element={
						<LayoutMainComponent>
							<CartPage />
						</LayoutMainComponent>
					} />
					<Route element={<OnlyAdminGuardComponent />}>

						<Route path="/admin/products" element={
							<LayoutAdminComponent>
								<ProductAdminPage />
							</LayoutAdminComponent>

						} />
						<Route path="/admin/orders" element={
							<LayoutAdminComponent>
								<OrdersAdmin />
							</LayoutAdminComponent>
						} />
					</Route>
					<Route path={'/login'} element={<LoginPage />} />
					<Route path={'/create-account'} element={<RegisterPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
