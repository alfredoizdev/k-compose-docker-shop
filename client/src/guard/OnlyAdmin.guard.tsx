import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { Q_GET_CURRENT_USER } from "../graphql/queries";
import LoadingComponent from "../components/UI/Loading.component";
import { addUser } from "../app/features/user/userSlice";

interface Props {
	children?: React.ReactElement
	redirectTo?: string;
}

const OnlyAdminGuardComponent = ({ redirectTo = "/home", children = undefined }: Props) => {

	const dispatch = useDispatch();
	const { loading } = useQuery(Q_GET_CURRENT_USER, {
		onCompleted: ({ getCurrentUser }) => {

			dispatch(addUser(getCurrentUser));

			if (getCurrentUser?.role !== "admin") {
				return <Navigate to={redirectTo} />
			}
		}
	});

	if (loading) return <LoadingComponent />


	return children ? children : <Outlet />;
}

export default OnlyAdminGuardComponent;