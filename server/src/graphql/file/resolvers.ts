import { Product } from '../../models/Product';
import { s3 } from '../../app';

 export const fileResolvers = {

  Mutation: {
	
 		uploadFile: async (_:any, {id,file}:any) => {

			let url = "";
      		const arrayBuffer = await file.arrayBuffer();
      		const buffer = Buffer.from(arrayBuffer);

			console.log(file)
			const getType = file.type.split("/")[1];
		
			const params = {
				Body: buffer,
				Bucket: 'k-app',
				Key: `${id}.${getType}`,

			};

			

			try {

				const data = await s3.upload(params).promise();

				url = data.Location;

				await Product.findByIdAndUpdate(id,{img: url});
			} catch (error) {
				throw new Error("Error on upload file");
			}
				
			return url
        }
	},
	
};
