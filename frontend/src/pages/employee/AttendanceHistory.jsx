import { useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import attendanceService from "../../services/attendanceService";
import { useDispatch, useSelector } from "react-redux";
import { setHistory, setAttendanceLoading } from "../../store/attendanceSlice";
import Loader from "../../components/common/Loader";

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    const loadHistory = async () => {
      dispatch(setAttendanceLoading(true));
      const res = await attendanceService.getHistory();
      dispatch(setHistory(res.data));
      dispatch(setAttendanceLoading(false));
    };
    loadHistory();
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
            <h2 className="text-2xl font-semibold mb-4">Attendance History</h2>

            <table className="w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Check In</th>
                  <th className="p-3 text-left">Check Out</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.checkInTime}</td>
                    <td className="p-3">{item.checkOutTime}</td>
                    <td className="p-3 capitalize">{item.status}</td>
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

export default AttendanceHistory;
