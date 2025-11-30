import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import Loader from "../../components/common/Loader";
import managerService from "../../services/managerService";
import { setReports, setManagerLoading } from "../../store/managerSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.manager);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });

  useEffect(() => {
    const loadReports = async () => {
      dispatch(setManagerLoading(true));
      const res = await managerService.getExportData();
      dispatch(setReports(res.data));
      dispatch(setManagerLoading(false));
    };
    loadReports();
  }, []);

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    if (!reports || reports.length === 0) return;

    const headers = ["Date", "Employee", "Check In", "Check Out", "Status"];
    const rows = reports.map((r) => [
      r.date,
      r.employeeName,
      r.checkInTime,
      r.checkOutTime,
      r.status
    ]);

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter((r) => {
    if (!dateRange.from && !dateRange.to) return true;
    const d = new Date(r.date);
    const from = dateRange.from ? new Date(dateRange.from) : null;
    const to = dateRange.to ? new Date(dateRange.to) : null;
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Reports</h2>

            <div className="flex gap-4 items-end">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <input
                  type="date"
                  name="from"
                  value={dateRange.from}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600">To</p>
                <input
                  type="date"
                  name="to"
                  value={dateRange.to}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Export CSV
              </button>
            </div>

            <table className="w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Employee</th>
                  <th className="p-3 text-left">Check In</th>
                  <th className="p-3 text-left">Check Out</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((r, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{r.date}</td>
                    <td className="p-3">{r.employeeName}</td>
                    <td className="p-3">{r.checkInTime}</td>
                    <td className="p-3">{r.checkOutTime}</td>
                    <td className="p-3 capitalize">{r.status}</td>
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

export default Reports;
