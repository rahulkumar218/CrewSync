import {
  LayoutDashboard,
  Users,
  Clock3,
  CalendarDays,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-[#0F172A] text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-violet-500">
          CrewSync
        </h1>

        <p className="text-sm text-slate-400">
          HR Management System
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 p-5 space-y-2">

        <MenuItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />

        <MenuItem icon={<Users size={20} />} text="Employees"  />

        <MenuItem icon={<Clock3 size={20} />} text="Attendance" />

        <MenuItem icon={<CalendarDays size={20} />} text="Leave Management"  />

        <MenuItem icon={<Wallet size={20} />} text="Payroll"active />

        <MenuItem icon={<BarChart3 size={20} />} text="Analytics" />

        <MenuItem icon={<Settings size={20} />} text="Settings" />

      </div>

      {/* Footer */}
      <div className="p-5 border-t border-slate-700">
        <p className="text-sm text-slate-400">
          © 2026 CrewSync
        </p>
      </div>

    </div>
  );
}

function MenuItem({ icon, text, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        active
          ? "bg-violet-600 text-white"
          : "hover:bg-slate-800 text-slate-300"
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

export default Sidebar;