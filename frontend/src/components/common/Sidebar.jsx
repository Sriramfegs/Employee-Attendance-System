import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const employeeLinks = [
    { to: "/employee/dashboard", label: "Dashboard" },
    { to: "/employee/mark", label: "Mark Attendance" },
    { to: "/employee/history", label: "History" },
    { to: "/employee/summary", label: "Summary" },
    { to: "/employee/profile", label: "Profile" }
  ];

  const managerLinks = [
    { to: "/manager/dashboard", label: "Dashboard" },
    { to: "/manager/employees", label: "Employees" },
    { to: "/manager/calendar", label: "Team Calendar" },
    { to: "/manager/reports", label: "Reports" }
  ];

  const links = user?.role === "manager" ? managerLinks : employeeLinks;

  return (
    <div className="w-64 h-screen bg-white shadow p-5">
      <h2 className="text-lg font-semibold mb-6">Menu</h2>
      <ul className="space-y-3">
        {links.map((item, i) => (
          <li key={i}>
            <Link className="block px-3 py-2 hover:bg-gray-200 rounded" to={item.to}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
