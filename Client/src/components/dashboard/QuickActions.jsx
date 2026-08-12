import {
  UserPlus,
  FileText,
  Download,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  // ==============================
  // ADD EMPLOYEE
  // ==============================
  const handleAddEmployee = () => {
    navigate("/employees");
  };

  // ==============================
  // GENERATE REPORT
  // ==============================
  const handleGenerateReport = () => {
    window.print();
  };

  // ==============================
  // EXPORT EMPLOYEE DATA
  // ==============================
  const handleExportData = () => {
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

    const headers = [
      "Employee Name",
      "Email",
      "Department",
      "Status",
    ];

    const rows = employees.map((employee) => [
      employee.name,
      employee.email,
      employee.department,
      employee.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "crewsync-employee-data.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-8">

      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quickly manage your workforce and generate useful reports.
        </p>
      </div>


      {/* Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* ================= ADD EMPLOYEE ================= */}
        <button
          type="button"
          onClick={handleAddEmployee}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-left text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/30 active:scale-[0.98]"
        >

          {/* Glow */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <UserPlus size={22} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Add Employee
                </h3>

                <p className="mt-1 text-xs text-violet-100">
                  Add a new team member
                </p>
              </div>

            </div>

            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </div>

        </button>


        {/* ================= GENERATE REPORT ================= */}
        <button
          type="button"
          onClick={handleGenerateReport}
          className="group relative rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg active:scale-[0.98]"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-100">
                <FileText size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Generate Report
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Print or save dashboard report
                </p>
              </div>

            </div>

            <ArrowRight
              size={19}
              className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-600"
            />

          </div>

        </button>


        {/* ================= EXPORT DATA ================= */}
        <button
          type="button"
          onClick={handleExportData}
          className="group relative rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg active:scale-[0.98]"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                <Download size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Export Data
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Download employee information
                </p>
              </div>

            </div>

            <ArrowRight
              size={19}
              className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-600"
            />

          </div>

        </button>

      </div>

    </section>
  );
}

export default QuickActions;