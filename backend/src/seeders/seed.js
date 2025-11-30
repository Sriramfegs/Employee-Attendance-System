import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import { hashPassword } from "../utils/passwordUtils.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Attendance.deleteMany();

    await User.create({
      name: "Admin Manager",
      email: "manager@example.com",
      password: await hashPassword("password"),
      role: "manager",
      department: "Administration"
    });

    const employees = await User.insertMany([
      {
        name: "John Employee",
        email: "john@example.com",
        password: await hashPassword("password"),
        role: "employee",
        employeeId: "EMP001",
        department: "IT"
      },
      {
        name: "Priya Employee",
        email: "priya@example.com",
        password: await hashPassword("password"),
        role: "employee",
        employeeId: "EMP002",
        department: "Finance"
      },
      {
        name: "Arun Employee",
        email: "arun@example.com",
        password: await hashPassword("password"),
        role: "employee",
        employeeId: "EMP003",
        department: "HR"
      }
    ]);

    const today = new Date().toISOString().split("T")[0];

    for (const emp of employees) {
      await Attendance.create({
        userId: emp._id,
        date: today,
        checkInTime: "09:10",
        checkOutTime: "17:00",
        status: "present",
        totalHours: 7.8
      });
    }

    console.log("Seed completed");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed", error.message);
    process.exit(1);
  }
};

seed();
