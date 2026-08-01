function EmployeeTable() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm mt-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Recent Employees
        </h2>

        <button className="text-violet-600 font-semibold">
          View All
        </button>
      </div>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="pb-3">Employee</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b h-16">

            <td>Binita Biswas</td>
            <td>HR</td>
            <td>HR Manager</td>

            <td>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </td>

          </tr>

          <tr className="border-b h-16">

            <td>Rahul Sharma</td>
            <td>Engineering</td>
            <td>Frontend Developer</td>

            <td>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                On Leave
              </span>

            </td>

          </tr>

          <tr className="h-16">

            <td>Priya Singh</td>
            <td>Finance</td>
            <td>Accountant</td>

            <td>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;