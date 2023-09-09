import mongoose from 'mongoose';

const connectDB = async () => {
  const DB_URL = process.env.MONGODB_URI as string;

  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true
    };
    await mongoose.connect(DB_URL, connectionParams);
    // mongoose.set('debug', true);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};

export default connectDB;