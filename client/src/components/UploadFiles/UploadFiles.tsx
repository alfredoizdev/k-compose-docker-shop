import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { M_UPLOAD_FILE } from '../../graphql/mutations';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { IProduct } from '../../interfaces/Product.interfaces';
import { useDispatch } from "react-redux";
import { setProduct } from "../../app/features/product/productSlice";

interface Props {
	handleNext: () => void,
	product: IProduct | null
}

const UploadFiles = ({ handleNext, product }: Props) => {

	const dispatch = useDispatch();

	const [selectedFile, setSelectedFile] = useState(null);

	const [uploadFileToServer] = useMutation(M_UPLOAD_FILE, {
		onCompleted: (data) => {

			if (product) {
				product.img = data.uploadFile;
				console.log(product);
				dispatch(setProduct(product));
				handleNext();
			}

		}
	});


	const uploadFile = async (e: any, file: any) => {
		e.preventDefault();

		if (!product) return;

		uploadFileToServer({
			variables: {
				file: selectedFile,
				id: product.id
			}
		});
	};


	const handleFileInput = (e: any) => {
		setSelectedFile(e.target.files[0]);
	};


	return (
		<div className="App">
			<Box sx={{ my: 1 }}>
				<Button
					variant="contained"
					component="label"
					fullWidth
				>
					Upload File
					<input
						type="file"
						hidden
						onChange={handleFileInput} multiple required
					/>
				</Button>
				<Button
					sx={{ mt: 1 }}
					color="secondary"
					variant="contained"
					fullWidth
					onClick={(e) => uploadFile(e, selectedFile)}
				>Finish</Button>
			</Box>
		</div>

	);
}

export default UploadFiles;