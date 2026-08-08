
import { useState } from "react";
function PayrollPage() {
const [payrollData, setPayrollData] = useState([
  {
    employee: "Rahul Sharma",
    role: "Software Engineer",
    salary: 65000,
    bonus: 5000,
    deductions: 2000,
    status: "Paid",
  },
  {
    employee: "Priya Singh",
    role: "UI Designer",
    salary: 55000,
    bonus: 3000,
    deductions: 1500,
    status: "Pending",
  },
]);

const updatePayrollStatus = (index) => {
  setPayrollData((prevData) =>
    prevData.map((employee, employeeIndex) =>
      employeeIndex === index
        ? { ...employee, status: "Paid" }
        : employee
    )
  );
};

const totalPayroll = payrollData.reduce(
  (total, employee) =>
    total + employee.salary + employee.bonus - employee.deductions,
  0
);

const paidEmployees = payrollData.filter(
  (employee) => employee.status === "Paid"
).length;

const pendingEmployees = payrollData.filter(
  (employee) => employee.status === "Pending"
).length;

const averageSalary =
  payrollData.length > 0
    ? payrollData.reduce(
        (total, employee) => total + employee.salary,
        0
      ) / payrollData.length
    : 0;

const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("All Status");
const [showPayrollModal, setShowPayrollModal] = useState(false);
const [payrollEmployee, setPayrollEmployee] = useState("");
const [payrollRole, setPayrollRole] = useState("");
const [payrollSalary, setPayrollSalary] = useState("");
const [payrollBonus, setPayrollBonus] = useState("");
const [payrollDeductions, setPayrollDeductions] = useState("");

const addPayroll = () => {
  if (
    !payrollEmployee ||
    !payrollRole ||
    !payrollSalary
  ) {
    return;
  }

  const newPayroll = {
    employee: payrollEmployee,
    role: payrollRole,
    salary: Number(payrollSalary),
    bonus: Number(payrollBonus) || 0,
    deductions: Number(payrollDeductions) || 0,
    status: "Pending",
  };

  setPayrollData((prevData) => [...prevData, newPayroll]);

  setPayrollEmployee("");
  setPayrollRole("");
  setPayrollSalary("");
  setPayrollBonus("");
  setPayrollDeductions("");

  setShowPayrollModal(false);
};

  return (
    <div className="space-y-7">

      {/* Payroll Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-lg">

        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative">

          <p className="mb-2 text-sm font-medium text-violet-100">
            Payroll Management
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Manage Employee Payroll 💰
          </h1>

          <p className="mt-2 max-w-xl text-sm text-violet-100 md:text-base">
            Track salaries, payments, deductions and payroll status
            from one place.
          </p>

        </div>

      </div>


      {/* Payroll Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Payroll
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
           ₹{totalPayroll.toLocaleString("en-IN")}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            This month
          </p>
        </div>


        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Employees Paid
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-500">
           {paidEmployees}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            This month
          </p>
        </div>


        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending Salary
          </p>

          <h2 className="mt-2 text-3xl font-bold text-amber-500">
           {pendingEmployees}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Employees
          </p>
        </div>


        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Average Salary
          </p>

          <h2 className="mt-2 text-3xl font-bold text-violet-500">
           ₹{Math.round(averageSalary).toLocaleString("en-IN")}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Per employee
          </p>
        </div>

      </div>


      {/* Payroll Table */}
      <div className="w-full rounded-2xl bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">

          <h2 className="text-xl font-bold text-slate-800">
            Employee Payroll
          </h2> 

          <button
  onClick={() => setShowPayrollModal(true)}
  className="mt-4 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
>
  + Add Payroll
</button>

          <p className="mt-1 text-sm text-slate-500">
            View employee salary and payment status.
          </p> 

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search employee..."
    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-violet-500"
  >
    <option>All Status</option>
    <option>Paid</option>
    <option>Pending</option>
  </select>
</div>

        </div>


        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-100 text-left text-sm text-slate-500">

                <th className="px-6 py-4 font-medium">
                  Employee
                </th>

                <th className="px-6 py-4 font-medium">
                  Salary
                </th>

                <th className="px-6 py-4 font-medium">
                  Bonus
                </th>

                <th className="px-6 py-4 font-medium">
                  Deductions
                </th>

                <th className="px-6 py-4 font-medium">
                  Net Salary
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

              </tr>
            </thead>


                   <tbody>
          {payrollData
  .filter((employee) =>
    employee.employee.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((employee) =>
    statusFilter === "All Status"
      ? true
      : employee.status === statusFilter
  )
  .map((employee, index) => {
            const netSalary =
              employee.salary + employee.bonus - employee.deductions;

            return (
              <tr
                key={index}
                className="border-b border-slate-50 hover:bg-slate-50/70"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">
                    {employee.employee}
                  </p>

                  <p className="text-xs text-slate-400">
                    {employee.role}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  ₹{employee.salary.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  ₹{employee.bonus.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4 text-sm text-red-500">
                  ₹{employee.deductions.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                  ₹{netSalary.toLocaleString("en-IN")}
                </td>

               <td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        employee.status === "Paid"
          ? "bg-emerald-50 text-emerald-600"
          : "bg-amber-50 text-amber-600"
      }`}
    >
      {employee.status}
    </span>

    {employee.status === "Pending" && (
      <button
        onClick={() => updatePayrollStatus(index)}
        className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
      >
        Mark Paid
      </button>
    )}
  </div>
</td>
              </tr>
            );
          })}
        </tbody>
          </table>

        </div>

      </div>

      {showPayrollModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

      {/* Modal Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Add Payroll
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add salary details for an employee.
          </p>
        </div>

        <button
          onClick={() => setShowPayrollModal(false)}
          className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          ✕
        </button>

      </div>


      {/* Form */}
      <div className="space-y-4">

        <input
          type="text"
          value={payrollEmployee}
          onChange={(e) => setPayrollEmployee(e.target.value)}
          placeholder="Employee name"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
        />

        <input
          type="text"
          value={payrollRole}
          onChange={(e) => setPayrollRole(e.target.value)}
          placeholder="Job role"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
        />

        <input
          type="number"
          value={payrollSalary}
          onChange={(e) => setPayrollSalary(e.target.value)}
          placeholder="Salary"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <input
            type="number"
            value={payrollBonus}
            onChange={(e) => setPayrollBonus(e.target.value)}
            placeholder="Bonus"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
          />

          <input
            type="number"
            value={payrollDeductions}
            onChange={(e) => setPayrollDeductions(e.target.value)}
            placeholder="Deductions"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
          />

        </div>

      </div>


      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={() => setShowPayrollModal(false)}
          className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
        >
          Cancel
        </button>

        <button
          onClick={addPayroll}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Add Payroll
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default PayrollPage;