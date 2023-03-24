import NavbarComponent from "../UI/Navbar.component";
interface LayoutMainProps {
	children: React.ReactElement
}

const LayoutAdminComponent = ({ children }: LayoutMainProps) => {


	return (
		<main>
			<NavbarComponent />
			{children}
		</main>

	);
}

export default LayoutAdminComponent;