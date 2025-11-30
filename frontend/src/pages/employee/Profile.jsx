import { useSelector } from "react-redux";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">My Profile</h2>

          <div className="bg-white p-6 shadow rounded space-y-3">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
