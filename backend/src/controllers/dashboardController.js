
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import { getTodayString } from "../utils/dateHelper.js";

export const employeeDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const all = await Attendance.find({ userId });

    const presentDays = all.filter((a) => a.status === "present").length;
    const absentDays = all.filter((a) => a.status === "absent").length;
    const lateDays = all.filter((a) => a.status === "late").length;

    const totalHours = all
      .reduce((sum, a) => sum + (a.totalHours || 0), 0)
      .toFixed(2);

    return res.json({
      presentDays,
      absentDays,
      lateDays,
      totalHours
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const managerDashboard = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    const today = getTodayString();

    const presentToday = await Attendance.countDocuments({
      date: today,
      status: "present"
    });

    const lateToday = await Attendance.countDocuments({
      date: today,
      status: "late"
    });

    const absentToday = employees.length - presentToday - lateToday;

    const lateEmployees = await Attendance.find({
      date: today,
      status: "late"
    })
      .populate("userId")
      .lean();

    const absentEmployees = [];

    for (const emp of employees) {
      const rec = await Attendance.findOne({
        userId: emp._id,
        date: today
      });

      if (!rec) {
        absentEmployees.push(emp);
      }
    }

    return res.json({
      totalEmployees: employees.length,
      presentToday,
      absentToday,
      lateToday,
      lateEmployees: lateEmployees.map((x) => ({
        name: x.userId?.name,
        department: x.userId?.department
      })),
      absentEmployees: absentEmployees.map((x) => ({
        name: x.name,
        department: x.department
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
