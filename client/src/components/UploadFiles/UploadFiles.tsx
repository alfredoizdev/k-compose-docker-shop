import { useState } from 'react';
import { s3 } from '../../aws/s3Client';
import './App.css';

function UploadFiles() {

	const [selectedFile, setSelectedFile] = useState(null);
	const [imageUrl, setImageUrl] = useState<string>("");


	const uploadFile = async (e: any, file: any) => {
		e.preventDefault();
		console.log(selectedFile);
		const params = {
			Body: file,
			Bucket: 'k-app',
			Key: `${Date.now()}.${file.name}`,
		};

		const { Location } = await s3.upload(params).promise();
		setImageUrl(Location)
	};


	const handleFileInput = (e: any) => {
		setSelectedFile(e.target.files[0]);
	};


	return (
		<div className="App">
			<h2> Here</h2>
			<input
				type="file"
				name="file"
				onChange={handleFileInput} multiple required />
			<button type="submit"
				onClick={(e) => uploadFile(e, selectedFile)}
			>send</button>

			{imageUrl && (
				<div style={{ marginTop: '10px' }}>
					<img src={imageUrl} alt="uploaded" />
				</div>
			)}
		</div>
	);
}

export default UploadFiles;