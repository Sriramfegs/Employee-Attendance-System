import { useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import attendanceService from "../../services/attendanceService";
import { useDispatch, useSelector } from "react-redux";
import { setSummary, setAttendanceLoading } from "../../store/attendanceSlice";
import Loader from "../../components/common/Loader";

const MonthlySummary = () => {
  const dispatch = useDispatch();
  const { summary, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        dispatch(setAttendanceLoading(true));
        const res = await attendanceService.getSummary();
        dispatch(setSummary(res.data));
      } catch (error) {
        console.error("Error loading summary", error);
      } finally {
        dispatch(setAttendanceLoading(false));
      }
    };
    loadSummary();
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        {loading || !summary ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Monthly Summary</h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded shadow">
                <p>Present Days</p>
                <h3 className="text-3xl font-bold">{summary.present}</h3>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p>Absent Days</p>
                <h3 className="text-3xl font-bold">{summary.absent}</h3>
              </div>

              <div className="bg-white p-5 rounded shadow">
                <p>Late Days</p>
                <h3 className="text-3xl font-bold">{summary.late}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlySummary;
