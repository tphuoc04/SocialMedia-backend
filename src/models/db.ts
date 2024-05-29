import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.URI!.toString()

const connectDB = async () => {
  try {
    await mongoose.connect(URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }
};

export default connectDB;
