import { UserPlus, FileText, Download } from "lucide-react";

function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="space-y-4">

        <button className="w-full flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-xl transition">
          <UserPlus size={20} />
          Add Employee
        </button>

        <button className="w-full flex items-center gap-3 border p-4 rounded-xl hover:bg-gray-50 transition">
          <FileText size={20} />
          Generate Report
        </button>

        <button className="w-full flex items-center gap-3 border p-4 rounded-xl hover:bg-gray-50 transition">
          <Download size={20} />
          Export Data
        </button>

      </div>

    </div>
  );
}

export default QuickActions;