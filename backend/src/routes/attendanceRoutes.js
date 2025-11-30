import express from "express";
import {
  checkIn,
  checkOut,
  todayAttendance,
  myHistory,
  mySummary,
  getAllEmployeesAttendance,
  getEmployeeAttendance,
  teamSummary,
  todayStatus,
  exportAttendance
} from "../controllers/attendanceController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);
router.get("/today", protect, todayAttendance);
router.get("/my-history", protect, myHistory);
router.get("/my-summary", protect, mySummary);

router.get("/all", protect, allowRoles("manager"), getAllEmployeesAttendance);
router.get("/employee/:id", protect, allowRoles("manager"), getEmployeeAttendance);
router.get("/summary", protect, allowRoles("manager"), teamSummary);
router.get("/today-status", protect, allowRoles("manager"), todayStatus);
router.get("/export", protect, allowRoles("manager"), exportAttendance);


export default router;
