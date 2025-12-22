import mongoose from "mongoose";
const userModel = new mongoose.Schema(
    {
        username : {
            type : String,
            require : true,
            unique : true,
        },
        email : {
            type : String,
            require : true,
            unique : true
        },
        password : {
            type : String,
            require : true
        }

    },{timestamps : true}
);
const User = mongoose.model('users', userModel);
export default User;
