import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import MarkAttendance from "../pages/employee/MarkAttendance";
import AttendanceHistory from "../pages/employee/AttendanceHistory";
import MonthlySummary from "../pages/employee/MonthlySummary";
import Profile from "../pages/employee/Profile";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import AllEmployees from "../pages/manager/AllEmployees";
import TeamCalendar from "../pages/manager/TeamCalendar";
import Reports from "../pages/manager/Reports";
import EmployeeDetails from "../pages/manager/EmployeeDetails";

import NotAuthorized from "../pages/misc/NotAuthorized";
import NotFound from "../components/common/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/mark"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["employee"]}>
              <MarkAttendance />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/history"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["employee"]}>
              <AttendanceHistory />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/summary"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["employee"]}>
              <MonthlySummary />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/profile"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["employee"]}>
              <Profile />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/employees"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["manager"]}>
              <AllEmployees />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/calendar"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["manager"]}>
              <TeamCalendar />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/reports"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["manager"]}>
              <Reports />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/employee/:id"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["manager"]}>
              <EmployeeDetails />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<NotAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
