import express from 'express';
import { signin, signup } from '../controller/auth.controller.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signInSchema, signUpSchema } from '../schemas/auth.schema.js';
const authRouter = express.Router();
authRouter.post(
    "/signup",
    validate(signUpSchema), 
    asyncHandler(signup)
);
authRouter.post(
    "/signin",
    validate(signInSchema),
    asyncHandler(signin)
);
export default authRouter;