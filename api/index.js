/**
 * Imports
 */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./router/auth.router.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.route.js";
import path from "path";

/**
 * App & Config
 */
dotenv.config();
const app = express();
const PORT = 3000;

/**
 * Render Deployement Code
 */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

/**
 * Global Middleware
 */
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
];

/**
 * CORS Config 
 */
app.use(
    cors({
        origin : (origin, callback) => {
            if(!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback (new Error("Not allowed by CORS"));
            }
        },
        credentials : true
    })
);

/**
 * Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

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
