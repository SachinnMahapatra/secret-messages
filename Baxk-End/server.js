import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// **Initialize Express App**
dotenv.config();
const app = express();

// **Middleware**
app.use(express.json()); // JSON support
app.use(cors()); // Enable CORS

// **Database Connection**
connectDB();

// **Routes**
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// **Test Route**
app.get("/", (req, res) => {
  res.send("Secret Message API is Running!");
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
