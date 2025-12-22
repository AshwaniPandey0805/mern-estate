import express from 'express';
import { signup } from '../controller/auth.controller.js';
import asyncHandler from '../utils/asyncHandler.js';
const authRouter = express.Router();
authRouter.post(
    "/signup", 
    asyncHandler(signup)
);
export default authRouter;