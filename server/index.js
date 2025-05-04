import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './router/auth.route.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Handle JSON requests

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Auth Router
app.use("/api/auth",authRouter );

// Middleware
app.use(( err ,req, res, next) => {
  // console.log(">>>>>>>>>>>>>>>>>>>",err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server errro";
  return res.status(statusCode).json({
    succcess : false,
    statusCode,
    message
  });
});