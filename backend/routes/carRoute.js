import express from "express";
import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controller/carController.js";
import {verifyToken} from "../middlewares/authMiddleware.js"
const carRouter = express.Router();
carRouter.use(verifyToken);

carRouter.post("/createCar", createCar);
carRouter.get("/getCar",verifyToken, getCars);
carRouter.get("/getCar/:id", verifyToken, getCars);
carRouter.put("/updateCar/:id",verifyToken, updateCar);
carRouter.delete("/deleteCar/:id",verifyToken, deleteCar);
carRouter.use(verifyToken);


export default carRouter;