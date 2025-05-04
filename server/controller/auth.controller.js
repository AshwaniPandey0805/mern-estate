import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next)=> {
    const {username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password : hashedPassword});
    try {
        await newUser.save();
        console.log(newUser);
        res.status(201).json("User created successfully")
    } catch (error) {
        next(error); 
    } 
}