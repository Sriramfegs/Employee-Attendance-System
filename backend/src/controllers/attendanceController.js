
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import { getTodayString } from "../utils/dateHelper.js";

export const checkIn = async (req, res) => {
  try {
    const today = getTodayString();
    const userId = req.user._id;

    const existing = await Attendance.findOne({ userId, date: today });
    if (existing && existing.checkInTime) {
      return res.status(400).json({ message: "Already checked in" });
    }

    const record =
      existing ||
      (await Attendance.create({
        userId,
        date: today
      }));

    record.checkInTime = new Date().toTimeString().slice(0, 5);
    await record.save();

    return res.json({ message: "Checked In" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const checkOut = async (req, res) => {
  try {
    const today = getTodayString();
    const userId = req.user._id;

    const record = await Attendance.findOne({ userId, date: today });
    if (!record || !record.checkInTime) {
      return res.status(400).json({ message: "Not checked in yet" });
    }

    if (record.checkOutTime) {
      return res.status(400).json({ message: "Already checked out" });
    }

    record.checkOutTime = new Date().toTimeString().slice(0, 5);

    const inTime = new Date(`2000-01-01T${record.checkInTime}`);
    const outTime = new Date(`2000-01-01T${record.checkOutTime}`);
    const diff = (outTime - inTime) / 3600000;

    record.totalHours = Math.max(diff, 0);
    await record.save();

    return res.json({ message: "Checked Out" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const todayAttendance = async (req, res) => {
  try {
    const today = getTodayString();
    const record = await Attendance.findOne({
      userId: req.user._id,
      date: today
    });

    return res.json(record || {});
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const myHistory = async (req, res) => {
  try {
    const records = await Attendance.find({
      userId: req.user._id
    }).sort({ date: -1 });

    return res.json(records);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const mySummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const all = await Attendance.find({ userId });

    const present = all.filter((x) => x.status === "present").length;
    const absent = all.filter((x) => x.status === "absent").length;
    const late = all.filter((x) => x.status === "late").length;

    return res.json({ present, absent, late });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllEmployeesAttendance = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" });

    const list = await Promise.all(
      users.map(async (u) => {
        const last = await Attendance.findOne({ userId: u._id })
          .sort({ date: -1 })
          .lean();

        return {
          id: u._id,
          name: u.name,
          email: u.email,
          department: u.department,
          lastStatus: last?.status || "none"
        };
      })
    );

    return res.json(list);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getEmployeeAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const attendance = await Attendance.find({ userId: id })
      .sort({ date: -1 })
      .lean();

    return res.json({
      name: user.name,
      email: user.email,
      department: user.department,
      employeeId: user.employeeId,
      recentAttendance: attendance.slice(0, 10)
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const teamSummary = async (req, res) => {
  try {
    const data = [];

    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().split("T")[0];

      const present = await Attendance.countDocuments({
        date,
        status: "present"
      });

      const absent = await Attendance.countDocuments({
        date,
        status: "absent"
      });

      const late = await Attendance.countDocuments({
        date,
        status: "late"
      });

      data.push({
        date,
        present,
        absent,
        late
      });
    }

    return res.json(data.reverse());
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const exportAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("userId")
      .sort({ date: -1 })
      .lean();

    const data = records.map((r) => ({
      date: r.date,
      employeeName: r.userId?.name || "Unknown",
      checkInTime: r.checkInTime,
      checkOutTime: r.checkOutTime,
      status: r.status
    }));

    return res.json(data);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};


export const todayStatus = async (req, res) => {
  try {
    const today = getTodayString();
    const employees = await User.find({ role: "employee" });

    const present = [];
    const absent = [];
    const late = [];

    for (const emp of employees) {
      const record = await Attendance.findOne({
        userId: emp._id,
        date: today
      });

      if (!record) {
        absent.push(emp.name);
        continue;
      }

      if (record.status === "late") {
        late.push(emp.name);
      }

      if (record.status === "present") {
        present.push(emp.name);
      }
    }

    return res.json({
      presentToday: present.length,
      absentToday: absent.length,
      lateToday: late.length,
      presentEmployees: present,
      absentEmployees: absent,
      lateEmployees: late
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
