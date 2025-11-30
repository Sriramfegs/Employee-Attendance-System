import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import { setEmployees, setManagerLoading } from "../../store/managerSlice";
import { Link } from "react-router-dom";

const AllEmployees = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.manager);

  useEffect(() => {
    const loadEmployees = async () => {
      dispatch(setManagerLoading(true));
      const res = await managerService.getAllEmployees();
      dispatch(setEmployees(res.data));
      dispatch(setManagerLoading(false));
    };
    loadEmployees();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Employees</h2>
            <table className="w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.department}</td>
                    <td className="p-3">
                      <Link
                        to={`/manager/employee/${emp.id}`}
                        className="text-blue-500"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEmployees;
