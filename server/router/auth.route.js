import express from "express";
import { signUp } from "../controller/auth.controller.js";
const authRouter = express.Router();
authRouter.get('/user',signUp);
export default authRouter;