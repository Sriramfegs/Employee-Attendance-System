import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-4xl font-bold">Employee Attendance System</h1>
      <p className="text-gray-600 text-lg">A simple way to manage attendance</p>

      <div className="flex gap-4">
        <Link
          className="px-6 py-2 bg-blue-600 text-white rounded"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="px-6 py-2 bg-green-600 text-white rounded"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
