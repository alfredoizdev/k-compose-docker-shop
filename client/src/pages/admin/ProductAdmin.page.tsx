import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import { GET_PRODUCTS } from "../../graphql/queries";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import LoadingComponent from "../../components/UI/Loading.component";
import { Button, Typography } from "@mui/material";
import { IProduct } from '../../interfaces/Product.interfaces';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useState } from 'react';
import CreateProduct from "../../components/forms/CreateProduct.component";


const HeaderAction = styled('div')`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;


const columns: GridColDef[] = [
	{
		field: 'img',
		headerName: 'Img',
		sortable: false,
		renderCell: ({ row }: GridRenderCellParams<IProduct>) => {
			return <img style={{ width: '100%' }} src={row.img || '/img/no-image.jpg'} alt={"img"} />
		},
	},
	{ field: 'title', headerName: 'Title', width: 150 },
	{ field: 'description', headerName: 'Description', width: 250 },
	{ field: 'price', headerName: 'Price', width: 150 },
	{ field: 'sizes', headerName: 'Sizes', width: 150 }
];

const ProductAdminPage = () => {

	const { data, loading, error } = useQuery(GET_PRODUCTS);
	const [open, setOpen] = useState(false);

	if (loading) return <LoadingComponent />;
	if (error) return <Typography>Opss!</Typography>

	return (
		<>
			<Container sx={{ pt: 4 }}>
				<HeaderAction>
					<Typography
						variant="h2">
						Orders
					</Typography>
					<Button color="secondary"
						onClick={() => setOpen(true)
						}>Create product</Button>
				</HeaderAction>
				<div
					style={{
						height: 700,
						width: '100%',
						padding: '10px 0'
					}}>
					<DataGrid rows={data?.products} columns={columns} />
				</div>
			</Container>
			<Drawer
				anchor={"right"}
				open={open}
				onClose={() => setOpen(false)}
			>
				<Box
					role="presentation"
					sx={{ width: 400, marginTop: 5, padding: '8px' }}
				>
					<CreateProduct setOpen={setOpen} />
				</Box>
			</Drawer>
		</>
	);
}

export default ProductAdminPage;