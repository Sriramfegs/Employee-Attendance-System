import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dashboardService from "../../services/dashboardService";
import { setEmployeeStats, setDashboardLoading } from "../../store/dashboardSlice";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { employeeStats, loading } = useSelector((state) => state.dashboard);

 useEffect(() => {
  const loadStats = async () => {
    try {
      dispatch(setDashboardLoading(true));
      const res = await dashboardService.employeeStats();
      dispatch(setEmployeeStats(res.data));
    } catch (error) {
      console.error("Employee dashboard error", error);
    } finally {
      dispatch(setDashboardLoading(false));
    }
  };
  loadStats();
}, [dispatch]);


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {loading || !employeeStats ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Employee Dashboard</h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white shadow p-5 rounded">
                <p className="text-gray-600">Present Days</p>
                <h3 className="text-3xl font-bold">
                  {employeeStats.presentDays}
                </h3>
              </div>

              <div className="bg-white shadow p-5 rounded">
                <p className="text-gray-600">Absent Days</p>
                <h3 className="text-3xl font-bold">
                  {employeeStats.absentDays}
                </h3>
              </div>

              <div className="bg-white shadow p-5 rounded">
                <p className="text-gray-600">Late Days</p>
                <h3 className="text-3xl font-bold">{employeeStats.lateDays}</h3>
              </div>
            </div>

            <div className="bg-white shadow p-5 rounded">
              <p className="text-gray-600">Total Hours This Month</p>
              <h3 className="text-3xl font-bold">{employeeStats.totalHours}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
