import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv"
import authRouter from "./router/auth.router.js";

const app = express();
dotenv.config();

/**
 * MongoDB Connection with check
 */

const connectDB = async () => {
    try {
        
        if(mongoose.connection.readyState === 1){
            console.log("Database is already connected");
            return;
        }

        if(mongoose.connect.readyState === 2){
            console.log("Database connection is in progess.");
            return;
        }

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is connected successfuly.");

    } catch (error) {
        console.log("Database connection error : ", error.message);
        process.exit(1);
    }
}

connectDB();

/**
 * Middleware
 */
app.use(express.json());
/**
 * Routes
 */
app.use('/auth', authRouter)


/**
 * Server
 */
const port = 3000;
app.listen(port, () => {
    console.log(`Serve is running on port ${port}`);
});