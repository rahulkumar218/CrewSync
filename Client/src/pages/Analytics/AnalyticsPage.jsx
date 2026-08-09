import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

function AnalyticsPage() {
const attendanceData = [
  { month: "Mar", attendance: 82 },
  { month: "Apr", attendance: 88 },
  { month: "May", attendance: 85 },
  { month: "Jun", attendance: 92 },
  { month: "Jul", attendance: 90 },
  { month: "Aug", attendance: 94 },
];

const departmentData = [
  { department: "Engineering", performance: 92 },
  { department: "Design", performance: 86 },
  { department: "Marketing", performance: 78 },
  { department: "HR", performance: 84 },
];

const performanceData = [
  { month: "Mar", performance: 72 },
  { month: "Apr", performance: 76 },
  { month: "May", performance: 79 },
  { month: "Jun", performance: 84 },
  { month: "Jul", performance: 87 },
  { month: "Aug", performance: 91 },
];

const [departmentFilter, setDepartmentFilter] = useState("All Departments");
const [selectedMonth, setSelectedMonth] = useState("August");
const monthAttendance = {
  March: 82,
  April: 88,
  May: 85,
  June: 92,
  July: 90,
  August: 94,
};

const monthPerformance = {
  March: 72,
  April: 76,
  May: 79,
  June: 84,
  July: 87,
  August: 91,
};

const monthLeaveRate = {
  March: 7.1,
  April: 6.8,
  May: 6.5,
  June: 6.0,
  July: 5.8,
  August: 6.2,
};

const monthEmployees = {
  March: 43,
  April: 45,
  May: 46,
  June: 47,
  July: 48,
  August: 48,
};

const selectedPerformance =
  performanceData.find(
    (item) =>
      item.month === selectedMonth.slice(0, 3)
  )?.performance || 0;

  const departmentMonthData = {
  March: [
    { department: "Engineering", performance: 88 },
    { department: "Design", performance: 82 },
    { department: "Marketing", performance: 75 },
    { department: "HR", performance: 80 },
  ],
  April: [
    { department: "Engineering", performance: 90 },
    { department: "Design", performance: 84 },
    { department: "Marketing", performance: 77 },
    { department: "HR", performance: 82 },
  ],
  May: [
    { department: "Engineering", performance: 91 },
    { department: "Design", performance: 85 },
    { department: "Marketing", performance: 78 },
    { department: "HR", performance: 83 },
  ],
  June: [
    { department: "Engineering", performance: 93 },
    { department: "Design", performance: 87 },
    { department: "Marketing", performance: 80 },
    { department: "HR", performance: 85 },
  ],
  July: [
    { department: "Engineering", performance: 94 },
    { department: "Design", performance: 88 },
    { department: "Marketing", performance: 82 },
    { department: "HR", performance: 86 },
  ],
  August: [
    { department: "Engineering", performance: 92 },
    { department: "Design", performance: 86 },
    { department: "Marketing", performance: 78 },
    { department: "HR", performance: 84 },
  ],
};

 return (
  <div className="space-y-7">

    {/* Analytics Header */}
    <div>
      <p className="text-sm font-medium text-violet-600">
        Employee Analytics
      </p>

      <h1 className="mt-1 text-3xl font-bold text-slate-800">
        Workforce Insights 📊
      </h1>

      <select
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
  className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-500"
>
  <option>August</option>
  <option>July</option>
  <option>June</option>
  <option>May</option>
  <option>April</option>
  <option>March</option>
</select>

      <p className="mt-2 text-sm text-slate-500">
        Track employee performance, attendance and workforce trends.
      </p>
    </div>


    {/* KPI Cards */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Total Employees
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-800">
         {monthEmployees[selectedMonth]}
        </h2>

        <p className="mt-2 text-xs text-emerald-500">
          ↑ 8% from last month
        </p>
      </div>


      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Avg. Attendance
        </p>

        <h2 className="mt-2 text-3xl font-bold text-emerald-500">
        {monthAttendance[selectedMonth]}%
        </h2>

        <p className="mt-2 text-xs text-emerald-500">
          ↑ 2.4% from last month
        </p>
      </div>


      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Avg. Performance
        </p>

        <h2 className="mt-2 text-3xl font-bold text-violet-500">
        {(monthPerformance[selectedMonth] / 20).toFixed(1)}/5
        </h2>

        <p className="mt-2 text-xs text-emerald-500">
          ↑ 0.3 from last month
        </p>
      </div>


      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Leave Rate
        </p>

        <h2 className="mt-2 text-3xl font-bold text-amber-500">
         {monthLeaveRate[selectedMonth]}%
        </h2>

        <p className="mt-2 text-xs text-red-500">
          ↑ 0.8% from last month
        </p>
      </div>

    </div>


    {/* Charts Area */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* Attendance Chart */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly attendance percentage
          </p>
        </div>

       <div className="h-64 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={attendanceData}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />

      <XAxis
        dataKey="month"
        tickLine={false}
        axisLine={false}
      />

      <YAxis
        domain={[0, 100]}
        tickLine={false}
        axisLine={false}
      />

      <Tooltip
  formatter={(value) => [`${value}%`, "Performance"]}
/>
      <Bar
        dataKey="attendance"
        radius={[8, 8, 0, 0]}
        fill="#8b5cf6"
      />
    </BarChart>
  </ResponsiveContainer>
</div>
      </div>


      {/* Department Performance */}

      
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Department Performance
          </h2>

<select
  value={departmentFilter}
  onChange={(e) => setDepartmentFilter(e.target.value)}
  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-violet-500"
>
  <option>All Departments</option>
  <option>Engineering</option>
  <option>Design</option>
  <option>Marketing</option>
  <option>HR</option>
</select>

          <p className="mt-1 text-sm text-slate-500">
            Average performance by department
          </p>
        </div>

        <div className="h-64 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
 data={
  departmentFilter === "All Departments"
    ? departmentMonthData[selectedMonth]
    : departmentMonthData[selectedMonth].filter(
        (item) => item.department === departmentFilter
      )
}
      layout="vertical"
      margin={{ left: 20, right: 20 }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        horizontal={false}
      />

      <XAxis
        type="number"
        domain={[0, 100]}
        tickLine={false}
        axisLine={false}
      />

      <YAxis
        type="category"
        dataKey="department"
        width={90}
        tickLine={false}
        axisLine={false}
      />

      <Tooltip />

      <Bar
        dataKey="performance"
        radius={[0, 8, 8, 0]}
        fill="#6366f1"
      />
    </BarChart>
  </ResponsiveContainer>
</div>
      </div>

    </div>

    <div className="rounded-2xl bg-white p-6 shadow-sm">
  <div className="mb-6">
    <p className="mt-2 text-2xl font-bold text-violet-600">
  {selectedPerformance}%
</p>
    <p className="mt-1 text-sm text-slate-500">
      Employee performance over the last six months.
    </p>
  </div>

  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={performanceData}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="performance"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

  </div>
);

}

export default AnalyticsPage;