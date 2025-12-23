import express from 'express';
import { signup } from '../controller/auth.controller.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signUpSchema } from '../schemas/auth.schema.js';
const authRouter = express.Router();
authRouter.post(
    "/signup",
    validate(signUpSchema), 
    asyncHandler(signup)
);
export default authRouter;