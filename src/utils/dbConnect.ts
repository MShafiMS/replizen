import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL as string);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default dbConnect;
