import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const user = new User({username, email, password : hashedPassword})
        await user.save();
        res.status(201).json({
            message : "user added successfully"
        });        
    } catch (error) {
        console.log("Error message : ", error.message);
        res.status(500).json({
            message : `Error message : ${error.message}`
        });
    }
}