import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv"
const app = express();
dotenv.config();
console.log( "Process env : " , process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err) => {   
        console.log('error message >>>>>>>>>>>>> : ', err);
    })

app.get('/check', (req, res) => {
    res.write('<h1>Server is running</h1>')
    res.end();
});

app.listen(3000, () => {
    console.log("Serve is running on port 3000");
});