import { date } from "zod";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.handler.js"
import bcryptjs from "bcryptjs"

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account."));

    if(req.body.password) req.body.password = bcryptjs.hashSync(req.body.password, 10);
    // console.log(re)
    const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar
            },   
        },
        {
            new : true
        }
    );
    console.log("updatedUser : ", updateUser._doc);
    
    const { password, ...rest } = updateUser._doc;
    
    res
        .status(200)
        .json({
            status : true,
            user : rest
        });
}

export const deleteUserByID = async (req, res, next) => {
    console.log("Going herer >>>>>>>>>>>>> ");
    console.log("req.user.id : ", req.user.id);
    console.log("req.params.id : ", req.params.id);
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account."))
    } 
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res
        .status(200)
        .json({
            status : true,
            message : "User has been deleted."
        })
}

export const signOutUser = async (req, res, next) => {
    console
    if(!req.user.id) return next(errorHandler(404, "User Not found"));
    res.clearCookie("access_token");
    res.status(200).json({
        status : true,
        message : "User has been logged out."
    });
}