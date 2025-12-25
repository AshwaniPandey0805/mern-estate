import User from "../models/user.model.js";
import {errorHandler} from "../utils/error.handler.js";
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    await User.create({
        username,
        email,
        password : hashedPassword
    });

    res.status(201).json({
        message : "user added successfully"
    });        
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    const isMatch = await bcryptjs.compareSync(password, user.password);
    if (!isMatch) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    const { password: pass, ...rest } = user._doc;

    res
        .cookie("access_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
        })
        .status(200)
        .json(rest);
};
