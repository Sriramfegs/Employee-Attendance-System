import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full h-14 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Attendance System</h1>
      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
