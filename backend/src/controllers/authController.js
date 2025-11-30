
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/generateToken.js";

const generateEmployeeId = async () => {
  const count = await User.countDocuments({ role: "employee" });
  const num = count + 1;
  return `EMP${String(num).padStart(3, "0")}`;
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const normalizedEmail = email.toLowerCase();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already used" });
    }

    const hashed = await hashPassword(password);

    let userRole = "employee";
    if (role && ["employee", "manager", "admin"].includes(role)) {
      userRole = role;
    }

    let employeeId;
    if (userRole === "employee") {
      employeeId = await generateEmployeeId();
    }

    await User.create({
      name,
      email: normalizedEmail,
      password: hashed,
      role: userRole,
      department,
      employeeId
    });

    return res.status(201).json({
      message: "Registered successfully"
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department
      },
      token
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res.json(req.user);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
