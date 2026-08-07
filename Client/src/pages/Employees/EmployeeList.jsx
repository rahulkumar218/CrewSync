import Navbar from "../../components/dashboard/Navbar";
import EmployeeTable from "../../components/employees/EmployeeTable";
import employeeBanner from "../../assets/images/employee-banner.png";


function EmployeeList() {
  return (
    <div className="flex-1 bg-slate-100 min-h-screen p-8">

    

      <div className="mt-8">

        {/* Header */}
        <div>

          <div
  className="relative overflow-hidden rounded-3xl h-[220px] flex items-center justify-between px-10"
  style={{
    backgroundImage: `linear-gradient(rgba(91,70,255,0.35),rgba(91,70,255,0.35)),url(${employeeBanner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  <div className="text-white max-w-xl">

    <h1 className="text-4xl font-bold">
      Employees 👨‍💼
    </h1>

    <p className="mt-4 text-violet-100 text-lg">
      Manage your workforce efficiently,
      track departments and monitor employee activity.
    </p>

  </div>

  <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6">

    <h3 className="text-white text-lg">
      Total Employees
    </h3>

    <h1 className="text-white text-5xl font-bold mt-2">
      248
    </h1>

  </div>


</div>
         
        </div>
<div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
  <div className="flex items-center justify-between mb-6">

    <div>

        <h2 className="text-xl font-bold text-slate-800">
            Employee Directory
        </h2>

        <p className="text-slate-500 text-sm mt-1">
            Search, filter and manage your workforce.
        </p>

    </div>

    <button className="bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
        + Add Employee
    </button>

</div>

 <div className="flex flex-wrap items-center gap-4">
    <input
      type="text"
      placeholder="🔍 Search Employee..."
      className="flex-1 min-w-[300px] px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition"
    />

    <div className="flex gap-4">

      <select className="px-5 py-3rounded-2xl bg-slate-50 border border-slate-200">
        <option>All Departments</option>
        <option>HR</option>
        <option>IT</option>
        <option>Finance</option>
      </select>

      <select className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200">
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