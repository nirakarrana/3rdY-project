import express from "express";
import {signup,signin} from "../controller/auth.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controller/auth.js";


const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.get("/getUser", verifyToken, getAllUsers);

export default authRouter;
















