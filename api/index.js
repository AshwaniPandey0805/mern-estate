/**
 * Imports
 */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./router/auth.router.js";
import connectDB from "./config/db.js";

/**
 * App & Config
 */
dotenv.config();
const app = express();
const PORT = 3000;

/**
 * Global Middleware
 */
app.use(express.json());

/**
 * Routes
 */
app.use("/auth", authRouter);

/**
 * Health check 
 */
app.get("/health", (req, res) => {
    const dbState = mongoose.connection.readyState;
    res.status(dbState == 1 ? 200 : 500).json({
        serve : "OK",
        database : dbState == 1 ? "Connected" : "Disconnected"
    });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("❌ Error:", message);

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

/**
 * Start Server ONLY after DB connection
 */
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    })
};

startServer();

/**
 * Gracefully shoutdown 
 */
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
    process.exit(0);
});
