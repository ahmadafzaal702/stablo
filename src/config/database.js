import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to the database at ${mongoose.connection.host}`.bgMagenta
    );
  } catch (error) {
    console.log(`rror in connecting with database: ${error}`.bgRed.white);
  }
};

export default connectDB;
