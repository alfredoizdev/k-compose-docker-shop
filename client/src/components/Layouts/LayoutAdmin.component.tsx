import { useDispatch } from "react-redux";
import { addUser } from "../../app/features/user/userSlice";
import { Q_GET_CURRENT_USER } from "../../graphql/queries";
import LoadingComponent from "../UI/Loading.component";
import NavbarComponent from "../UI/Navbar.component";
import { useQuery } from "@apollo/client";

interface LayoutMainProps {
	children: React.ReactElement
}

const LayoutAdminComponent = ({ children }: LayoutMainProps) => {
	const dispatch = useDispatch();
	const { loading, data } = useQuery(Q_GET_CURRENT_USER);

	if (loading) return <LoadingComponent />

	dispatch(addUser(data?.getCurrentUser));

	return (
		<main>
			<NavbarComponent />
			{children}
		</main>

	);
}

export default LayoutAdminComponent;