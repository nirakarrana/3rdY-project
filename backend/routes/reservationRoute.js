import express from "express";
import {verifyToken} from "../middlewares/authMiddleware.js"
import { sendReservation, getAllReservations,updateReservation,deleteReservation } from "../controller/reservation.js";




const router = express.Router();

router.get("/getReservation", verifyToken, getAllReservations); 
router.post("/createReservation",verifyToken, sendReservation);
router.put("/updateReservation/:id", verifyToken, updateReservation);
router.delete("/deleteReservation/:id", verifyToken, deleteReservation);

export default router;
