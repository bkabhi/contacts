import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/mongoDB";
import contactRoutes from "./routes/Contacts.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/contacts", contactRoutes);

// Start the server
app.listen(PORT, async () => {
  try {
    // connecting db
    await connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
