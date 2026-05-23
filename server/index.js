import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import leadRoutes from "./routes/leadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import followUpRoutes from "./routes/followUpRoutes.js";

dotenv.config();

const app = express();


// Middleware
// app.use(cors());
app.use(
  cors({
    origin: "https://your-frontend.vercel.app",
    credentials: true,
  })
);
app.use(express.json());


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/followups", followUpRoutes);



// Port
const PORT = process.env.PORT || 5000;


// Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});