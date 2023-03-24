import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { M_UPLOAD_FILE } from '../../graphql/mutations';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//import { s3 } from '../../aws/s3Client';

interface Props {
	handleNext: () => void,
	id: string;
}

const UploadFiles = ({ handleNext, id }: Props) => {

	console.log("upload file", id);

	const [selectedFile, setSelectedFile] = useState(null);

	const [uploadFileToServer, { data }] = useMutation(M_UPLOAD_FILE, {
		onCompleted: (data) => {
			handleNext();
		}
	});


	const uploadFile = async (e: any, file: any) => {
		e.preventDefault();
		console.log("client", selectedFile);
		uploadFileToServer({
			variables: {
				file: selectedFile,
				id
			}
		});
	};


	const handleFileInput = (e: any) => {
		setSelectedFile(e.target.files[0]);
	};

	console.log("server", data?.uploadFile)


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