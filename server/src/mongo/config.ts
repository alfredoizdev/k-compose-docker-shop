import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		const conn = await mongoose.connect(`mongodb://mongodb/store`);
		console.log(`Mongodb is connected: ${conn.connection.name}`)
	} catch (error:unknown) {
		console.log(`Error: ${error}`);
		process.exit(1)
	}
}