import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";

interface Props {
	children?: React.ReactElement
	redirectTo?: string;
}

const OnlyAdminGuardComponent = ({ redirectTo = "/home", children = undefined }: Props) => {

	const role = useSelector((state: RootState) => state.user.role)

	if (role !== "admin") {
		return <Navigate to={redirectTo} />
	}

	return children ? children : <Outlet />;
}

export default OnlyAdminGuardComponent;