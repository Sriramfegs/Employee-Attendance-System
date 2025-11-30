import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import dashboardService from "../../services/dashboardService";
import { setManagerStats, setDashboardLoading } from "../../store/dashboardSlice";

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { managerStats, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
  const loadStats = async () => {
    try {
      dispatch(setDashboardLoading(true));
      const res = await dashboardService.managerStats();
      dispatch(setManagerStats(res.data));
    } catch (error) {
      console.error("Manager dashboard error", error);
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
        {loading || !managerStats ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Manager Dashboard</h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded shadow">
                <p className="text-gray-600">Total Employees</p>
                <h3 className="text-3xl font-bold">
                  {managerStats.totalEmployees}
                </h3>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p className="text-gray-600">Present Today</p>
                <h3 className="text-3xl font-bold">
                  {managerStats.presentToday}
                </h3>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p className="text-gray-600">Absent Today</p>
                <h3 className="text-3xl font-bold">
                  {managerStats.absentToday}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded shadow">
                <p className="text-gray-600 mb-2">Late Arrivals Today</p>
                <ul className="space-y-1">
                  {managerStats.lateEmployees?.map((emp, i) => (
                    <li key={i} className="text-sm">
                      {emp.name} ({emp.department})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p className="text-gray-600 mb-2">Absent Employees Today</p>
                <ul className="space-y-1">
                  {managerStats.absentEmployees?.map((emp, i) => (
                    <li key={i} className="text-sm">
                      {emp.name} ({emp.department})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
