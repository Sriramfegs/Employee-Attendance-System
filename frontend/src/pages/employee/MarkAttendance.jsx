import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import attendanceService from "../../services/attendanceService";
import { useDispatch, useSelector } from "react-redux";
import { setToday, setAttendanceLoading } from "../../store/attendanceSlice";
import Loader from "../../components/common/Loader";

const MarkAttendance = () => {
  const dispatch = useDispatch();
  const { today, loading } = useSelector((state) => state.attendance);
  const [message, setMessage] = useState("");

  const loadToday = async () => {
    try {
      dispatch(setAttendanceLoading(true));
      const res = await attendanceService.getToday();
      dispatch(setToday(res.data));
    } catch (error) {
      console.error("Error loading today attendance", error);
    } finally {
      dispatch(setAttendanceLoading(false));
    }
  };

  useEffect(() => {
    loadToday();
  }, [dispatch]);

  const handleCheckIn = async () => {
    try {
      await attendanceService.checkIn();
      setMessage("Checked In Successfully");
      loadToday();
    } catch (error) {
      console.error("Check-in failed", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await attendanceService.checkOut();
      setMessage("Checked Out Successfully");
      loadToday();
    } catch (error) {
      console.error("Check-out failed", error);
    }
  };

  const hasCheckedIn = today && today.checkInTime;
  const hasCheckedOut = today && today.checkOutTime;

  let statusText = "Not Checked In";
  if (hasCheckedIn && !hasCheckedOut) statusText = "Checked In";
  if (hasCheckedIn && hasCheckedOut) statusText = "Completed";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        {loading || today === null ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            {message && (
              <p className="bg-green-100 text-green-700 p-2 rounded w-fit">
                {message}
              </p>
            )}

            <h2 className="text-2xl font-semibold">Mark Attendance</h2>

            <div className="bg-white p-6 shadow rounded space-y-4">
              <p className="text-lg">
                Today's Status: <span className="font-bold">{statusText}</span>
              </p>

              <div className="flex gap-4">
                {!hasCheckedIn && (
                  <button
                    onClick={handleCheckIn}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Check In
                  </button>
                )}

                {hasCheckedIn && !hasCheckedOut && (
                  <button
                    onClick={handleCheckOut}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;
