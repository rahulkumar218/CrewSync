import Navbar from "../../components/dashboard/Navbar";
import EmployeeTable from "../../components/employees/EmployeeTable";

function EmployeeList() {
  return (
    <div className="flex-1 bg-slate-100 min-h-screen p-8">

      <Navbar />

      <div className="mt-8">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Employees
            </h1>

            <p className="text-slate-500 mt-2">
              Manage all employees in your organization.
            </p>
          </div>

          <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            + Add Employee
          </button>

        </div>
<div className="mt-8 bg-white rounded-3xl shadow-sm p-6">

  <div className="flex flex-wrap gap-4 justify-between">

    <input
      type="text"
      placeholder="🔍 Search Employee..."
      className="w-80 px-5 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500"
    />

    <div className="flex gap-4">

      <select className="px-5 py-3 rounded-xl border border-slate-200">
        <option>All Departments</option>
        <option>HR</option>
        <option>IT</option>
        <option>Finance</option>
      </select>

      <select className="px-5 py-3 rounded-xl border border-slate-200">
        <option>All Status</option>
        <option>Active</option>
        <option>On Leave</option>
        <option>Inactive</option>
      </select>

    </div>

  </div>

</div>
<EmployeeTable />
      </div>

    </div>
  );
}

export default EmployeeList;