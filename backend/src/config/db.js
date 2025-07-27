import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI)
		console.log(`Mongo DB Connected: ${connection.connection.host}`)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}
