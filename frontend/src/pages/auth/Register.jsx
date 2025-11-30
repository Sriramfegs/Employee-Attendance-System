import { useState } from "react";
import authService from "../../services/authServer";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee"
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    await authService.register(form);
    navigate("/login");
  } catch (err) {
    console.log("REGISTER ERROR", err?.response?.data);
    const msg = err?.response?.data?.message || "Registration failed";
    setError(msg);
  }
};

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded shadow space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
