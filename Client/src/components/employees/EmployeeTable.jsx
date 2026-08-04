import { employees } from "../../data/employeeData";
import { Eye, Pencil, Trash2 } from "lucide-react";

function EmployeeTable() {
  return (
    <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr className="text-left text-slate-600">

            <th className="px-6 py-4">Employee</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr
              key={employee.id}
              className="border-t hover:bg-slate-50 transition"
            >

              {/* Employee */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full"
                  />

                  <div>

                    <h3 className="font-semibold">
                      {employee.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {employee.email}
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6">
                {employee.department}
              </td>

              <td className="px-6">
                {employee.role}
              </td>

              <td className="px-6">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : employee.status === "On Leave"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {employee.status}
                </span>

              </td>

              <td className="px-6">

                <div className="flex justify-center gap-4">

                  <Eye
                    size={18}
                    className="cursor-pointer text-slate-500 hover:text-violet-600"
                  />

                  <Pencil
                    size={18}
                    className="cursor-pointer text-slate-500 hover:text-blue-600"
                  />

                  <Trash2
                    size={18}
                    className="cursor-pointer text-slate-500 hover:text-red-600"
                  />

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;