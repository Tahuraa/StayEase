import express from "express";
import { assignRoom } from "../controllers/assignroomController.js";
const router = express.Router();

router.post("/bookings/:bookingId/assign-room", assignRoom);

export default router;
