import express from "express";
import {
  employeeDashboard,
  managerDashboard
} from "../controllers/dashboardController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/employee", protect, employeeDashboard);
router.get("/manager", protect, allowRoles("manager"), managerDashboard);

export default router;
