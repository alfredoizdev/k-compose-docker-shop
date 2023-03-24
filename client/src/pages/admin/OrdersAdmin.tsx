import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LoadingComponent from "../../components/UI/Loading.component";
import { Q_GET_ORDERS } from "../../graphql/queries";

const columns: GridColDef[] = [
	{ field: 'numberOfItems', headerName: 'Item', width: 150 },
	{ field: 'total', headerName: 'Total', width: 150 },
	{ field: 'numberOfItems', headerName: 'Items', width: 150 },
	{ field: 'tax', headerName: 'Tax', width: 150 }
];

const OrdersAdmin = () => {

	const { data, loading, error } = useQuery(Q_GET_ORDERS);

	if (loading) return <LoadingComponent />;
	if (error) return <Typography>Opss!</Typography>

	console.log(data)

	return (
		<Container>
			<Typography variant="h2">
				Orders
			</Typography>
			<div
				style={{
					height: 500,
					width: '100%',
					padding: '10px 0'
				}}>
				<DataGrid rows={data?.orders} columns={columns} />
			</div>
		</Container>
	);
}

export default OrdersAdmin;