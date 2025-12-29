import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { signInSchema } from "../schemas/auth.schema.js";
import { verifyToken } from "../utils/verifyUser.js";
import asyncHandler from "../utils/asyncHandler.js";
import { updateUser, signOutUser, deleteUserByID } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post(
    "/update/:id",
    // validate(signInSchema),
    verifyToken,
    asyncHandler(updateUser)
);

userRouter.delete(
    "/delete/:id",
    verifyToken,
    asyncHandler(deleteUserByID)
)

userRouter.post(
    "/sign-out/:id",
    verifyToken,
    asyncHandler(signOutUser)
)


export default userRouter;