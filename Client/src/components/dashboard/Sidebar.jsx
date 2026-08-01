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
    <div className="w-72 min-h-screen bg-[#0F172A] text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
       <div className="flex items-center gap-3">

  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-xl">
    C
  </div>

  <div>

    <h1 className="text-2xl font-bold">
      CrewSync
    </h1>

    <p className="text-xs text-slate-400">
      HR Management
    </p>

  </div>

</div>

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

        <MenuItem icon={<Wallet size={20} />} text="Payroll" />

        <MenuItem icon={<BarChart3 size={20} />} text="Analytics" />

        <MenuItem icon={<Settings size={20} />} text="Settings" />

      </div>

      {/* Footer */}
      <div className="p-5 border-t border-slate-700">
        <p className="text-sm text-slate-400">
          {/* Bottom Section */}
<div className="p-5 border-t border-slate-700 space-y-5">

  {/* Promo Card */}
  <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-5">

    <h3 className="font-bold text-lg">
      Automate HR
    </h3>

    <p className="text-sm text-violet-100 mt-2">
      Empower your workforce with CrewSync.
    </p>

    <button className="mt-4 w-full bg-white text-violet-700 py-2 rounded-xl font-semibold hover:bg-slate-100 transition">
      Learn More
    </button>

  </div>

  {/* User Profile */}
  <div className="flex items-center gap-3">

    <img
      src="https://i.pravatar.cc/100?img=5"
      alt="Profile"
      className="w-12 h-12 rounded-full border-2 border-violet-500"
    />

    <div className="flex-1">
      <h4 className="font-semibold">
        Binita Biswas
      </h4>

      <p className="text-xs text-slate-400">
        HR Manager
      </p>
    </div>

  </div>

</div>
        </p>
      </div>

    </div>
  );
}

function MenuItem({ icon, text, active }) {
  return (
    <button
      className={`group w-full flex items-center gap-3 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <div
        className={`transition ${
          active ? "scale-110" : "group-hover:scale-110"
        }`}
      >
        {active && (
  <div className="w-1 h-8 rounded-full bg-white"></div>
)}
        {icon}
      </div>

      <span>{text}</span>
    </button>
  );
}

export default Sidebar;