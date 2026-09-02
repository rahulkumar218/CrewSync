import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserCheck,
  UserX,
  Search,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import {
  getAttendance,
  addAttendance,
} from "../../services/attendanceService";
import { getEmployees } from "../../services/employeeService";

function Attendance() {
 const [selectedMonth, setSelectedMonth] = useState("2026-08");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [showModal, setShowModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [selectedAttendanceStatus, setSelectedAttendanceStatus] =
    useState("Present");

  const [employees, setEmployees] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

// ================= DYNAMIC ATTENDANCE DATA =================

const getMonthIndex = (monthYear) => {
  const [, month] = monthYear.split("-");

  return Number(month) - 1;
};
const getDaysInMonth = (monthYear) => {
  const [year, month] = monthYear.split("-");

  return new Date(
    Number(year),
    Number(month),
    0
  ).getDate();
};
// ================= MONTHLY CHART DATA =================

const monthlyAttendanceData = (() => {
  const [year, month] = selectedMonth.split("-");

  const monthIndex = Number(month) - 1;
  const daysInMonth = getDaysInMonth(selectedMonth);

  const data = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const present = employees.filter((employee) => {
      if (!employee.date) return false;

      const date = new Date(employee.date);

      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() === monthIndex &&
        date.getDate() === day &&
        employee.status === "Present"
      );
    }).length;

    const late = employees.filter((employee) => {
      if (!employee.date) return false;

      const date = new Date(employee.date);

      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() === monthIndex &&
        date.getDate() === day &&
        employee.status === "Late"
      );
    }).length;

    const absent = employees.filter((employee) => {
      if (!employee.date) return false;

      const date = new Date(employee.date);

      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() === monthIndex &&
        date.getDate() === day &&
        employee.status === "Absent"
      );
    }).length;

    const date = new Date(
      Number(year),
      monthIndex,
      day
    );

    data.push({
      day: date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }),
      present,
      late,
      absent,
    });
  }

  return data;
})();

// ================= MONTHLY STATS =================

const selectedMonthStats = (() => {
  const [year, month] = selectedMonth.split("-");

const monthIndex = Number(month) - 1;
  const monthRecords = employees.filter((employee) => {
    if (!employee.date) return false;

    const date = new Date(employee.date);

    return (
      date.getFullYear() === Number(year) &&
      date.getMonth() === monthIndex
    );
  });

  const present = monthRecords.filter(
    (employee) => employee.status === "Present"
  ).length;

  const late = monthRecords.filter(
    (employee) => employee.status === "Late"
  ).length;

  const absent = monthRecords.filter(
    (employee) => employee.status === "Absent"
  ).length;

  const total = present + late + absent;

  const rate =
    total > 0
      ? ((present + late) / total) * 100
      : 0;

  return {
    present,
    late,
    absent,
    rate: `${rate.toFixed(1)}%`,
  };
})();

// ================= TODAY'S STATS =================

const today = new Date();

const todayRecords = employees.filter((employee) => {
  if (!employee.date) return false;

  const date = new Date(employee.date);

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
});

const todayPresent = todayRecords.filter(
  (employee) => employee.status === "Present"
).length;

const todayLate = todayRecords.filter(
  (employee) => employee.status === "Late"
).length;

const todayAbsent = todayRecords.filter(
  (employee) => employee.status === "Absent"
).length;

const currentStats = {
  present: todayPresent,
  late: todayLate,
  absent: todayAbsent,
  rate: selectedMonthStats.rate,
};
  // ================= GET ATTENDANCE =================

useEffect(() => {
  fetchAttendance();
  fetchEmployeeOptions();
}, []);

const fetchAttendance = async () => {
  try {
    const data = await getAttendance();

    console.log("Attendance API Response:", data);

    const formattedEmployees = data.map((item) => ({
  attendance_id: item.attendance_id,
  employee_id: item.employee_id,
  name: `${item.first_name || ""} ${item.last_name || ""}`.trim(),
  role: "Employee",
  date: item.date,
  time: item.check_in || "--",
  hours: calculateWorkingHours(item.check_in, item.check_out),
  status: item.status,
}));

    setEmployees(formattedEmployees);
  } catch (error) {
    console.error("Unable to load attendance:", error);
    alert(error.message || "Unable to load attendance");
  }
};

const fetchEmployeeOptions = async () => {
  try {
    const data = await getEmployees();

    const formattedEmployees = data.map((employee) => ({
      employee_id: employee.employee_id,
      name: `${employee.first_name || ""} ${employee.last_name || ""}`.trim(),
    }));

    setEmployeeOptions(formattedEmployees);
  } catch (error) {
    console.error("Unable to load employees:", error);
    alert(error.message || "Unable to load employees");
  }
};
  // ================= WORKING HOURS =================

  const calculateWorkingHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) {
      return "--";
    }

    const start = new Date(`1970-01-01T${checkIn}`);
    const end = new Date(`1970-01-01T${checkOut}`);

    if (isNaN(start) || isNaN(end)) {
      return "--";
    }

    const difference = end - start;

    if (difference <= 0) {
      return "--";
    }

    const totalMinutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  // ================= ADD ATTENDANCE =================

 const handleSaveAttendance = async () => {
  if (!selectedEmployee) {
    alert("Please select an employee");
    return;
  }

  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const currentTime = new Date()
      .toTimeString()
      .split(" ")[0];

    const attendanceData = {
      employee_id: Number(selectedEmployee),
      date: today,
      check_in:
        selectedAttendanceStatus === "Absent"
          ? null
          : currentTime,
      check_out: null,
      status: selectedAttendanceStatus,
    };

    const data = await addAttendance(attendanceData);

    console.log("Add Attendance Response:", data);

    alert("Attendance saved successfully!");

    await fetchAttendance();

    setShowModal(false);
    setSelectedEmployee("");
    setSelectedAttendanceStatus("Present");
  } catch (error) {
    console.error("Save Attendance Error:", error);
    alert(error.message || "Unable to connect to server");
  }
};
  // ================= FILTER =================

  const filteredEmployees =
    employees.filter((employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        selectedStatus === "All Status" ||
        employee.status === selectedStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // ================= UI =================

  return (
    <div className="space-y-7">

      {/* ================= HEADER ================= */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 p-8 text-white shadow-lg">

        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <div className="mb-3 flex items-center gap-2 text-violet-100">

              <CalendarDays size={20} />

              <span className="text-sm font-medium">
                Attendance Management
              </span>

            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              Employee Attendance
            </h1>

            <p className="mt-2 max-w-xl text-sm text-violet-100 md:text-base">
              Monitor daily attendance, working hours and employee presence
              from one simple dashboard.
            </p>

          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-xl">

           <div>
  <p className="text-sm text-violet-100 mb-1">
    Selected Month
  </p>

  <input
    type="month"
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    className="bg-transparent text-white text-lg font-semibold outline-none cursor-pointer"
  />
</div>
          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* PRESENT */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <UserCheck size={22} />
            </div>

            <span className="text-xs font-medium text-emerald-500">
              +4.2%
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Present Today
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-800">
            {currentStats.present}
          </h2>

        </div>

        {/* LATE */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <Clock3 size={22} />
            </div>

            <span className="text-xs font-medium text-amber-500">
              7.5%
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Late Arrivals
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-800">
            {currentStats.late}
          </h2>

        </div>

        {/* ABSENT */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-red-100 p-3 text-red-500">
              <UserX size={22} />
            </div>

            <span className="text-xs font-medium text-red-500">
              Today
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Absent
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-800">
            {currentStats.absent}
          </h2>

        </div>

        {/* RATE */}

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <CheckCircle2 size={22} />
            </div>

            <span className="text-xs font-medium text-blue-500">
              This month
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Attendance Rate
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-800">
            {currentStats.rate}
          </h2>

        </div>

      </div>

      {/* ================= CHART ================= */}

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-slate-800">
            Weekly Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Employee attendance trends for this week.
          </p>

        </div>

        <div className="h-[320px] w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

           <BarChart
  data={monthlyAttendanceData}
>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="present"
                name="Present"
                fill="#8B5CF6"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="late"
                name="Late"
                fill="#F59E0B"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="absent"
                name="Absent"
                fill="#EF4444"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= ATTENDANCE TABLE ================= */}

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Today's Attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track today's employee check-ins and working hours.
            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}

            <div className="flex items-center rounded-xl border border-slate-200 px-4 py-2.5">

              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="ml-2 w-full bg-transparent text-sm outline-none sm:w-52"
              />

            </div>

            {/* STATUS */}

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-500"
            >

              <option>
                All Status
              </option>

              <option>
                Present
              </option>

              <option>
                Late
              </option>

              <option>
                Absent
              </option>

            </select>

            {/* MARK ATTENDANCE */}

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              + Mark Attendance
            </button>

          </div>

        </div>

        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50">

              <tr className="text-left text-sm text-slate-500">

                <th className="px-6 py-4 font-medium">
                  Employee
                </th>

                <th className="px-6 py-4 font-medium">
                  Check In
                </th>

                <th className="px-6 py-4 font-medium">
                  Working Hours
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No attendance records found.
                  </td>

                </tr>

              ) : (

                filteredEmployees.map(
                  (employee, index) => (

                    <tr
                      key={
                        employee.attendance_id ||
                        index
                      }
                      className="border-t border-slate-100 transition hover:bg-violet-50/30"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 font-semibold text-white">

                            {employee.name.charAt(0)}

                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {employee.name}
                            </p>

                            <p className="text-sm text-slate-400">
                              {employee.role}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {employee.time}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {employee.hours}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            employee.status === "Present"
                              ? "bg-emerald-100 text-emerald-600"
                              : employee.status === "Late"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {employee.status}
                        </span>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= MARK ATTENDANCE MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-800">
                Mark Attendance
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedEmployee("");
                  setSelectedAttendanceStatus("Present");
                }}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="mt-6 space-y-4">

              {/* EMPLOYEE */}

              <select
                value={selectedEmployee}
                onChange={(e) =>
                  setSelectedEmployee(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
              >

                <option value="">
                  Select Employee
                </option>

                {employeeOptions.map((employee) => (
  <option
    key={employee.employee_id}
    value={employee.employee_id}
  >
    {employee.name}
  </option>
))}
              </select>

              {/* STATUS */}

              <select
                value={selectedAttendanceStatus}
                onChange={(e) =>
                  setSelectedAttendanceStatus(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
              >

                <option value="Present">
                  Present
                </option>

                <option value="Late">
                  Late
                </option>

                <option value="Absent">
                  Absent
                </option>

              </select>

              {/* SAVE */}

              <button
                onClick={handleSaveAttendance}
                className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
              >
                Save Attendance
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Attendance;