import { useMutation, useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import { GET_PRODUCTS } from "../../graphql/queries";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import LoadingComponent from "../../components/UI/Loading.component";
import { Button, Typography } from "@mui/material";
import { IProduct } from '../../interfaces/Product.interfaces';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import CreateProduct from "../../components/forms/CreateProduct.component";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, setListProduct } from "../../app/features/product/productSlice";
import { RootState } from "../../app/store";
import { M_DELETE_PRODUCR } from "../../graphql/mutations";


const HeaderAction = styled('div')`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;




const ProductAdminPage = () => {

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
		{ field: 'sizes', headerName: 'Sizes', width: 150 },
		{
			field: 'action',
			headerName: 'Actions',
			sortable: false,
			renderCell: ({ row }: GridRenderCellParams<any>) => {

				return <Button onClick={() => handleDelete(row.id)}>
					<DeleteOutlineIcon />
				</Button>
			}
		}
	];


	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.products);

	const [open, setOpen] = useState(false);

	const [deleteProduct] = useMutation(M_DELETE_PRODUCR, {
		onCompleted: (data) => {
			console.log(data.deleteProduct)
			dispatch(removeProduct(data.deleteProduct));
		}
	})


	const handleDelete = (id: string) => {
		deleteProduct({
			variables: {
				id
			}
		})
	}


	const { loading, error } = useQuery(GET_PRODUCTS, {
		onCompleted: (data) => {
			dispatch(setListProduct(data.products));
		}
	});


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
					<DataGrid rows={state.products} columns={columns} />
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