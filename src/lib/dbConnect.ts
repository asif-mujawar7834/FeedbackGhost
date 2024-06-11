import mongoose, { Connection } from "mongoose";

interface connectionObject {
  isConnected?: number;
}

const connection: connectionObject = {};

export const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connection.readyState;
    console.log(connection);
  } catch (error) {
    console.log("Database connection failed ", error);
    process.exit(1);
  }
};
