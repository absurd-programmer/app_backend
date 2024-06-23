import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Fix for __dirname not defined in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Middleware setup
app.use(
  cors({
    origin: [
      "https://likeslelo.vercel.app",
      "https://likeslelo.onrender.com",
      "https://likeslelo.netlify.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Enable GZIP compression
app.use(compression());

// Serve static files with caching headers
const staticOptions = {
  maxAge: "1y", // Cache for 1 year
  etag: false,
};

app.use(express.static(path.join(__dirname, "./client/build"), staticOptions));

// Route setup
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Fallback to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Define port
const PORT = process.env.PORT || 8080;

// Log MongoDB URL for verification
console.log(`MONGO_URL is ${process.env.MONGO_URL}`.bgYellow.white);

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
