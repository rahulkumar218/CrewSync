function EmployeeTable() {
  const employees = [
    {
      name: "Binita Biswas",
      email: "binita@crewsync.com",
      department: "HR",
      status: "Active",
    },
    {
      name: "Rahul Sharma",
      email: "rahul@crewsync.com",
      department: "Engineering",
      status: "On Leave",
    },
    {
      name: "Priya Singh",
      email: "priya@crewsync.com",
      department: "Finance",
      status: "Active",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Recent Employees
        </h2>

        <button className="text-violet-600 font-medium">
          View All
        </button>
      </div>

      <table className="w-full">

        <thead>
          <tr className="text-gray-500 border-b">
            <th className="text-left pb-4">Employee</th>
            <th className="text-left pb-4">Department</th>
            <th className="text-left pb-4">Status</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((emp, index) => (

            <tr key={index} className="border-b last:border-none">

              <td className="py-4">

                <div className="flex items-center gap-3">

                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 10}`}
                    className="w-11 h-11 rounded-full"
                    alt={emp.name}
                  />

                  <div>
                    <p className="font-medium">
                      {emp.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {emp.email}
                    </p>
                  </div>

                </div>

              </td>

              <td>{emp.department}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    emp.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {emp.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;