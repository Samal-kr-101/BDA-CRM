import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import leadRoutes from "./routes/leadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import followUpRoutes from "./routes/followUpRoutes.js";

dotenv.config();

const app = express();


// CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bda-leadflow.vercel.app",
    ],
    credentials: true,
  })
);


// MIDDLEWARE
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/followups", followUpRoutes);


// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


// PORT
const PORT = process.env.PORT || 5000;


// SERVER
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});