import { useState } from "react";
import {
  Users,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  Building2,
  UserCheck,
  Clock3,
  Award,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

function AnalyticsPage() {
  const [month, setMonth] = useState("August");
  const [department, setDepartment] = useState("All Departments");

  const attendanceData = [
    { month: "Mar", attendance: 83 },
    { month: "Apr", attendance: 89 },
    { month: "May", attendance: 86 },
    { month: "Jun", attendance: 94 },
    { month: "Jul", attendance: 92 },
    { month: "Aug", attendance: 96 },
  ];

  const departmentData = [
    { name: "Engineering", performance: 92 },
    { name: "Design", performance: 88 },
    { name: "Marketing", performance: 81 },
    { name: "HR", performance: 86 },
  ];

  const employeeGrowthData = [
    { month: "Mar", employees: 38 },
    { month: "Apr", employees: 40 },
    { month: "May", employees: 42 },
    { month: "Jun", employees: 44 },
    { month: "Jul", employees: 46 },
    { month: "Aug", employees: 48 },
  ];

  const leaveData = [
    { name: "Casual Leave", value: 42 },
    { name: "Sick Leave", value: 28 },
    { name: "Earned Leave", value: 24 },
    { name: "Unpaid Leave", value: 6 },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  const filteredDepartments =
    department === "All Departments"
      ? departmentData
      : departmentData.filter((item) => item.name === department);

  return (
    <div className="space-y-6 pb-10">

      {/* ================= HEADER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-7 text-white shadow-xl transition-all duration-500 hover:shadow-2xl">

        {/* Background decoration */}
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative z-10">

          <div className="mb-2 flex items-center gap-2">
            <BarChart className="h-5 w-5" />

            <p className="text-sm font-semibold text-violet-100">
              Employee Analytics
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Workforce Insights 📊
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-indigo-100 md:text-base">
            Track employee performance, attendance and workforce trends
            from one powerful dashboard.
          </p>

        </div>
      </div>


      {/* ================= FILTERS ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Analytics Period
          </p>

          <h2 className="text-lg font-bold text-slate-800">
            {month} Overview
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm outline-none transition-all duration-300 hover:border-violet-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          >
            <option>August</option>
            <option>July</option>
            <option>June</option>
            <option>May</option>
            <option>April</option>
          </select>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm outline-none transition-all duration-300 hover:border-violet-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>HR</option>
          </select>

        </div>
      </div>


      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Employees */}
        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Employees
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-800">
                48
              </h2>

              <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500">
                <TrendingUp size={15} />
                <span>8% from last month</span>
              </div>
            </div>

            <div className="rounded-2xl bg-violet-50 p-3 text-violet-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Users size={24} />
            </div>

          </div>
        </div>


        {/* Attendance */}
        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Avg. Attendance
              </p>

              <h2 className="mt-3 text-3xl font-bold text-emerald-500">
                94%
              </h2>

              <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500">
                <TrendingUp size={15} />
                <span>2.4% from last month</span>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <CalendarCheck size={24} />
            </div>

          </div>
        </div>


        {/* Performance */}
        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Avg. Performance
              </p>

              <h2 className="mt-3 text-3xl font-bold text-violet-500">
                4.5/5
              </h2>

              <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500">
                <TrendingUp size={15} />
                <span>0.3 from last month</span>
              </div>
            </div>

            <div className="rounded-2xl bg-violet-50 p-3 text-violet-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Award size={24} />
            </div>

          </div>
        </div>


        {/* Leave */}
        <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Leave Rate
              </p>

              <h2 className="mt-3 text-3xl font-bold text-amber-500">
                6.2%
              </h2>

              <div className="mt-2 flex items-center gap-1 text-sm font-medium text-red-500">
                <TrendingDown size={15} />
                <span>0.8% from last month</span>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 p-3 text-amber-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Clock3 size={24} />
            </div>

          </div>
        </div>

      </div>


      {/* ================= CHART ROW ================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Attendance */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Attendance Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monthly attendance percentage
            </p>
          </div>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
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

                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />

                <Bar
                  dataKey="attendance"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1200}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>


        {/* Department */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

          <div className="mb-5 flex items-start justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Department Performance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Average performance by department
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Building2 size={20} />
            </div>

          </div>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredDepartments}
                layout="vertical"
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={90}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />

                <Bar
                  dataKey="performance"
                  fill="#6366f1"
                  radius={[0, 8, 8, 0]}
                  animationDuration={1200}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>


      {/* ================= SECOND CHART ROW ================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Employee Growth */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Employee Growth
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Workforce growth over the last six months
            </p>
          </div>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={employeeGrowthData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="employees"
                  stroke="#6366f1"
                  strokeWidth={4}
                  dot={{
                    r: 5,
                    fill: "#6366f1",
                  }}
                  activeDot={{
                    r: 8,
                  }}
                  animationDuration={1500}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>


        {/* Leave Distribution */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Leave Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Employee leave breakdown
            </p>
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row">

            <div className="h-[260px] w-full md:w-1/2">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={leaveData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    animationDuration={1200}
                  >

                    {leaveData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>

            </div>


            <div className="w-full space-y-4 md:w-1/2">

              {leaveData.map((item, index) => (
                <div
                  key={item.name}
                  className="group flex items-center justify-between rounded-xl p-2 transition-all duration-300 hover:bg-slate-50 hover:translate-x-1"
                >

                  <div className="flex items-center gap-3">

                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index],
                      }}
                    />

                    <span className="text-sm font-medium text-slate-600">
                      {item.name}
                    </span>

                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    {item.value}%
                  </span>

                </div>
              ))}

            </div>

          </div>
        </div>

      </div>


      {/* ================= INSIGHT CARDS ================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="group rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <TrendingUp size={22} />
          </div>

          <h3 className="text-lg font-bold">
            Attendance is improving
          </h3>

          <p className="mt-2 text-sm text-violet-100">
            Average attendance increased by 2.4% compared with last month.
          </p>

        </div>


        <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 transition-transform duration-300 group-hover:scale-110">
            <UserCheck size={22} />
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            Engineering leads
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Engineering currently has the highest average performance score.
          </p>

        </div>


        <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition-transform duration-300 group-hover:scale-110">
            <Clock3 size={22} />
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            Monitor leave rate
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Leave rate increased slightly this month and may need attention.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsPage;