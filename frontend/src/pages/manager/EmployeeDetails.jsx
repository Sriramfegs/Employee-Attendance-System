import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import {
  setSelectedEmployee,
  setManagerLoading
} from "../../store/managerSlice";

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEmployee, loading } = useSelector((state) => state.manager);

  useEffect(() => {
    const loadEmployee = async () => {
      dispatch(setManagerLoading(true));
      const res = await managerService.getEmployeeById(id);
      dispatch(setSelectedEmployee(res.data));
      dispatch(setManagerLoading(false));
    };
    loadEmployee();
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {loading || !selectedEmployee ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">
              {selectedEmployee.name} - Details
            </h2>

            <div className="bg-white p-6 rounded shadow space-y-2">
              <p>Email: {selectedEmployee.email}</p>
              <p>Department: {selectedEmployee.department}</p>
              <p>Employee ID: {selectedEmployee.employeeId}</p>
            </div>

            <div className="bg-white p-6 rounded shadow space-y-2">
              <h3 className="text-xl font-semibold mb-2">
                Recent Attendance
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Check In</th>
                    <th className="p-2 text-left">Check Out</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEmployee.recentAttendance?.map((a, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{a.date}</td>
                      <td className="p-2">{a.checkInTime}</td>
                      <td className="p-2">{a.checkOutTime}</td>
                      <td className="p-2 capitalize">{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
