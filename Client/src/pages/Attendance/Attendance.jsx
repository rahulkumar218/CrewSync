import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserCheck,
  UserX,
  Search,
  ChevronDown,
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
import { useState } from "react";

function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState("August 2026");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("");
const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState("Present");
   const monthlyAttendanceData = {
  "August 2026": [
    { day: "Mon", present: 182, late: 12, absent: 6 },
    { day: "Tue", present: 190, late: 8, absent: 2 },
    { day: "Wed", present: 186, late: 14, absent: 8 },
    { day: "Thu", present: 194, late: 6, absent: 4 },
    { day: "Fri", present: 188, late: 11, absent: 5 },
    { day: "Sat", present: 120, late: 4, absent: 3 },
  ],

  "July 2026": [
    { day: "Mon", present: 175, late: 15, absent: 10 },
    { day: "Tue", present: 181, late: 11, absent: 8 },
    { day: "Wed", present: 178, late: 13, absent: 9 },
    { day: "Thu", present: 185, late: 9, absent: 6 },
    { day: "Fri", present: 180, late: 12, absent: 8 },
    { day: "Sat", present: 115, late: 5, absent: 4 },
  ],

  "June 2026": [
    { day: "Mon", present: 168, late: 18, absent: 14 },
    { day: "Tue", present: 174, late: 14, absent: 12 },
    { day: "Wed", present: 170, late: 16, absent: 11 },
    { day: "Thu", present: 179, late: 10, absent: 9 },
    { day: "Fri", present: 176, late: 13, absent: 10 },
    { day: "Sat", present: 108, late: 7, absent: 5 },
  ],
};

const monthlyStats = {
  "August 2026": {
    present: 186,
    late: 14,
    absent: 8,
    rate: "94.8%",
  },

  "July 2026": {
    present: 181,
    late: 18,
    absent: 11,
    rate: "92.4%",
  },

  "June 2026": {
    present: 174,
    late: 21,
    absent: 15,
    rate: "89.7%",
  },
};
const currentStats = monthlyStats[selectedMonth];
  const [employees, setEmployees] = useState([
    {
      name: "Binita Biswas",
      role: "HR Manager",
      time: "09:02 AM",
      hours: "8h 12m",
      status: "Present",
    },
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      time: "09:18 AM",
      hours: "7h 48m",
      status: "Present",
    },
    {
      name: "Priya Singh",
      role: "Accountant",
      time: "09:35 AM",
      hours: "7h 25m",
      status: "Late",
    },
    {
      name: "Aman Gupta",
      role: "Marketing Executive",
      time: "--",
      hours: "--",
      status: "Absent",
    },
  ]);
 const filteredEmployees = employees.filter((employee) => {
  const matchesSearch = employee.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    selectedStatus === "All Status" ||
    employee.status === selectedStatus;

  return matchesSearch && matchesStatus;
});
  return (
    <div className="space-y-7">

      {/* Header */}
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

  <p className="text-sm text-violet-100">
    Selected Month
  </p>

  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    className="mt-1 bg-transparent text-xl font-bold outline-none cursor-pointer"
  >
    <option className="text-slate-800">
      August 2026
    </option>

    <option className="text-slate-800">
      July 2026
    </option>

    <option className="text-slate-800">
      June 2026
    </option>
  </select>

</div>

        </div>
      </div>


      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <UserCheck size={22} />
            </div>
            <span className="text-xs font-medium text-emerald-500">
              +4.2%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Present Today</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">
  {currentStats.present}
</h2>
        </div>


        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <Clock3 size={22} />
            </div>
            <span className="text-xs font-medium text-amber-500">
              7.5%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Late Arrivals</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">
  {currentStats.late}
</h2>
        </div>


        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-red-100 p-3 text-red-500">
              <UserX size={22} />
            </div>
            <span className="text-xs font-medium text-red-500">
              Today
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Absent</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">
  {currentStats.absent}
</h2>
        </div>


        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <CheckCircle2 size={22} />
            </div>
            <span className="text-xs font-medium text-blue-500">
              This month
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Attendance Rate</p>
         
         <h2 className="mt-1 text-3xl font-bold text-slate-800">
  {currentStats.rate}
</h2>
        </div>

      </div>

      {/* Attendance Chart */}

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

    <ResponsiveContainer width="100%" height="100%">

     <BarChart data={monthlyAttendanceData[selectedMonth]}>

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


      {/* Attendance Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">

        {/* Table Header */}
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

            <div className="flex items-center rounded-xl border border-slate-200 px-4 py-2.5">
              <Search size={18} className="text-slate-400" />
              

             <input
  type="text"
  placeholder="Search employee..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="ml-2 w-full bg-transparent text-sm outline-none sm:w-52"
/>

            </div>

            <select
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-500"
>
  <option>All Status</option>
  <option>Present</option>
  <option>Late</option>
  <option>Absent</option>
</select>
<button
  onClick={() => setShowModal(true)}
  className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
>
  + Mark Attendance
</button> 

{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Mark Attendance
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-2xl text-slate-400 hover:text-slate-700"
        >
          ×
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <select
  value={selectedEmployee}
  onChange={(e) => setSelectedEmployee(e.target.value)}
  className="w-full rounded-xl border border-slate-200 px-4 py-3"
>
          <option>Select Employee</option>
          {employees.map((employee, index) => (
            <option key={index}>{employee.name}</option>
          ))}
        </select>

        <select
  value={selectedAttendanceStatus}
  onChange={(e) => setSelectedAttendanceStatus(e.target.value)}
  className="w-full rounded-xl border border-slate-200 px-4 py-3"
>
          <option>Present</option>
          <option>Late</option>
          <option>Absent</option>
        </select>

        <button
        onClick={() => {
  if (!selectedEmployee) return;

  setEmployees((prevEmployees) =>
    prevEmployees.map((employee) =>
      employee.name === selectedEmployee
        ? {
            ...employee,
            status: selectedAttendanceStatus,
          }
        : employee
    )
  );

  setShowModal(false);
  setSelectedEmployee("");
  setSelectedAttendanceStatus("Present");
}}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Save Attendance
        </button>
      </div>

    </div>
  </div>
)}

          </div>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50">
              <tr className="text-left text-sm text-slate-500">
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Check In</th>
                <th className="px-6 py-4 font-medium">Working Hours</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>

             {filteredEmployees.map((employee, index) => (
                <tr
                  key={index}
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
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div> 
    
    
    
  );
  


}

export default Attendance;