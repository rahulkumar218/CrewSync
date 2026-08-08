import { useState } from "react";

function LeavePage() {
    const [showModal, setShowModal] = useState(false);
    const [leaveEmployee, setLeaveEmployee] = useState("");
const [leaveType, setLeaveType] = useState("");
const [leaveFrom, setLeaveFrom] = useState("");
const [leaveTo, setLeaveTo] = useState("");
const [leaveReason, setLeaveReason] = useState("");
const [leaveRequests, setLeaveRequests] = useState([
  {
    employee: "Rahul Sharma",
    role: "Software Engineer",
    type: "Casual Leave",
    from: "08 Aug 2026",
    to: "09 Aug 2026",
    days: 2,
    status: "Pending",
  },
  {
    employee: "Priya Singh",
    role: "UI Designer",
    type: "Sick Leave",
    from: "10 Aug 2026",
    to: "11 Aug 2026",
    days: 2,
    status: "Approved",
  },
]);

const calculateDays = (from, to) => {
  const start = new Date(from);
  const end = new Date(to);

  return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
};

const updateLeaveStatus = (index, status) => {
  setLeaveRequests((prevRequests) =>
    prevRequests.map((request, requestIndex) =>
      requestIndex === index
        ? { ...request, status }
        : request
    )
  );
};
  return (
    <div className="space-y-7">

      {/* Leave Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-lg">

        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <p className="mb-2 text-sm font-medium text-violet-100">
              Leave Management
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              Manage Employee Leaves 🌿
            </h1>

            <p className="mt-2 max-w-xl text-sm text-violet-100 md:text-base">
              Track leave requests, approvals and employee leave balances
              from one simple dashboard.
            </p>
          </div>

          <button
  onClick={() => setShowModal(true)}
  className="rounded-xl bg-white px-5 py-3 font-semibold text-violet-600 shadow-sm transition hover:bg-violet-50"
>
  + Apply Leave
</button>

        </div>
      </div>


      {/* Leave Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm text-slate-500">
            Total Leave Requests
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            64
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            This month
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm text-slate-500">
            Pending Requests
          </p>
          <h2 className="mt-2 text-3xl font-bold text-amber-500">
            12
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Need approval
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm text-slate-500">
            Approved Leaves
          </p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-500">
            48
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            This month
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm text-slate-500">
            On Leave Today
          </p>
          <h2 className="mt-2 text-3xl font-bold text-violet-500">
            8
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Employees
          </p>
        </div>

      </div>


      {/* Leave Requests */}
      <div className="w-full rounded-2xl bg-white shadow-sm">

        {/* Table Header */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Leave Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage employee leave requests.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="text"
              placeholder="Search employee..."
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500"
            />

            <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

          </div>

        </div>


        {/* Table */}
        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-100 text-left text-sm text-slate-500">

                <th className="px-6 py-4 font-medium">
                  Employee
                </th>

                <th className="px-6 py-4 font-medium">
                  Leave Type
                </th>

                <th className="px-6 py-4 font-medium">
                  From
                </th>

                <th className="px-6 py-4 font-medium">
                  To
                </th>

                <th className="px-6 py-4 font-medium">
                  Days
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 font-medium">
                  Action
                </th>

              </tr>
            </thead>


           <tbody>
  {leaveRequests.map((request, index) => (
    <tr
      key={index}
      className="border-b border-slate-50 transition hover:bg-slate-50/70"
    >
      <td className="px-6 py-4">
        <p className="font-semibold text-slate-800">
          {request.employee}
        </p>
        <p className="text-xs text-slate-400">
          {request.role}
        </p>
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {request.type}
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {request.from}
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">
        {request.to}
      </td>

      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
        {request.days}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            request.status === "Approved"
              ? "bg-emerald-50 text-emerald-600"
              : request.status === "Rejected"
              ? "bg-red-50 text-red-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {request.status}
        </span>
      </td>

      <td className="px-6 py-4">
        {request.status === "Pending" ? (
          <div className="flex gap-2">
            <button className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-100">
              Approve
            </button>

            <button className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100">
              Reject
            </button>
          </div>
        ) : (
          <span className="text-sm text-slate-400">
            Completed
          </span>
        )}
      </td>
    </tr>
  ))}
</tbody>
          </table>

        </div>

      </div>


{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Apply for Leave
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-2xl text-slate-400 hover:text-slate-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Employee
          </label>

         <select
  value={leaveEmployee}
  onChange={(e) => setLeaveEmployee(e.target.value)}
  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
>
            <option>Select Employee</option>
            <option>Rahul Sharma</option>
            <option>Priya Singh</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Leave Type
          </label>

          <select
  value={leaveType}
  onChange={(e) => setLeaveType(e.target.value)}
  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
>
            <option>Select Leave Type</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Earned Leave</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              From
            </label>

            <input
  type="date"
  value={leaveFrom}
  onChange={(e) => setLeaveFrom(e.target.value)}
  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500"
/>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              To
            </label>

            <input
  type="date"
  value={leaveTo}
  onChange={(e) => setLeaveTo(e.target.value)}
  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-violet-500"
/>
          </div>

        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Reason
          </label>

         <textarea
  rows="3"
  value={leaveReason}
  onChange={(e) => setLeaveReason(e.target.value)}
  placeholder="Enter reason for leave..."
  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
/>
        </div>

        <button
        onClick={() => {
  if (!leaveEmployee || !leaveType || !leaveFrom || !leaveTo) return;

  const newRequest = {
    employee: leaveEmployee,
    role: "Employee",
    type: leaveType,
    from: leaveFrom,
    to: leaveTo,
    days: calculateDays(leaveFrom, leaveTo),
    status: "Pending",
  };

  setLeaveRequests((prevRequests) => [
    ...prevRequests,
    newRequest,
  ]);

  setShowModal(false);
  setLeaveEmployee("");
  setLeaveType("");
  setLeaveFrom("");
  setLeaveTo("");
  setLeaveReason("");
}}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Submit Leave Request
        </button>

      </div>

    </div>

  </div>
)}
   
    </div>
  );
}

export default LeavePage;