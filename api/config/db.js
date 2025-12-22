import mongoose from "mongoose";

/**
 * MongoDB Connection with Retry    
 */
const connectDB = async ( retries = 5, delay = 5000 ) => {
    
    try {
        const state = mongoose.connection.readyState;

        if (state === 1) {
            console.log("✅ Database already connected");
            return;
        }

        if (state === 2) {
            console.log("⏳ Database connection in progress");
            return;
        }

        await mongoose.connect(process.env.MONGODB_URL, {
            maxPoolSize : 10,
            serverSelectionTimeoutMS : 5000,
            socketTimeoutMS : 45000
        });

        console.log("✅ Database connected successfully");

    } catch (error) {

        console.log(`❌ DB connection failed. Retries left: ${retries}`)
        
        if(retries == 0){
            console.log("❌ Could not connect to database. Exiting...");
            process.exit(1);
        }

        setTimeout(()=> connectDB(retries - 1, delay), delay);
    }
};

export default connectDB;