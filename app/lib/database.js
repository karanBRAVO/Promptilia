import mongoose from "mongoose";

let connectionStatus = false;

export const connectToDB = async () => {
  if (connectionStatus) {
    console.log("[*] Already Connected to MongoDB...");
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[*] Connected to Mongodb...");
    connectionStatus = true;
    return true;
  } catch (e) {
    return false;
  }
};
