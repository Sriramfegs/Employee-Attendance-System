import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import { setTeamCalendar, setManagerLoading } from "../../store/managerSlice";

const TeamCalendar = () => {
  const dispatch = useDispatch();
  const { teamCalendar, loading } = useSelector((state) => state.manager);

  useEffect(() => {
    const loadCalendar = async () => {
      try {
        dispatch(setManagerLoading(true));
        const res = await managerService.getTeamSummary();
        dispatch(setTeamCalendar(res.data));
      } catch (error) {
        console.error("Error loading team calendar", error);
      } finally {
        dispatch(setManagerLoading(false));
      }
    };
    loadCalendar();
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Team Calendar View</h2>
            <table className="w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Present</th>
                  <th className="p-3 text-left">Absent</th>
                  <th className="p-3 text-left">Late</th>
                </tr>
              </thead>
              <tbody>
                {teamCalendar.map((day, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{day.date}</td>
                    <td className="p-3">{day.present}</td>
                    <td className="p-3">{day.absent}</td>
                    <td className="p-3">{day.late}</td>
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

export default TeamCalendar;
