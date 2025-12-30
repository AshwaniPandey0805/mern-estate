import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./router/auth.router.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

/**
 * Global Middleware
 */
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
   "https://mern-estate-2-fv0l.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/**
 * API Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

/**
 * Health check
 */
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.status(dbState === 1 ? 200 : 500).json({
    server: "OK",
    database: dbState === 1 ? "Connected" : "Disconnected",
  });
});

/**
 * Frontend (Render / MERN)
 */
app.use(express.static(path.join(__dirname, "client/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
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
    message,
  });
});

/**
 * Start Server
 */
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

/**
 * Graceful shutdown
 */
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down server...");
  await mongoose.connection.close();
  console.log("🔒 Database connection closed");
  process.exit(0);
});
