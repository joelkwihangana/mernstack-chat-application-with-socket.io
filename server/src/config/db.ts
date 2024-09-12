import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Define a function to connect to the database
const connectToDatabase = async (): Promise<void> => {
  try {
    // Check if the environment variable is defined
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI);

    // Log successful connection
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    // Handle and log errors
    console.error(`Error connecting: ${error.message || error}`);
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
};

// Export the function
export default connectToDatabase;
