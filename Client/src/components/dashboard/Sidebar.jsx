import {
  LayoutDashboard,
  Users,
  Clock3,
  CalendarDays,
  Wallet,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      icon: LayoutDashboard,
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Users,
      text: "Employees",
      path: "/employees",
    },
    {
      icon: Clock3,
      text: "Attendance",
      path: "/attendance",
    },
    {
      icon: CalendarDays,
      text: "Leave Management",
      path: "/leave",
    },
    {
      icon: Wallet,
      text: "Payroll",
      path: "/payroll",
    },
    {
      icon: BarChart3,
      text: "Analytics",
      path: "/analytics",
    },
    {
      icon: Settings,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col overflow-hidden bg-slate-950 text-white shadow-2xl">

      {/* ================= LOGO ================= */}
      <div className="border-b border-slate-800 p-6">

        <div className="group flex cursor-pointer items-center gap-3">

          {/* Logo Icon */}
          <div className="group/logo relative flex h-12 w-12 shrink-0 items-center justify-center">
  {/* Glow */}
  <div className="absolute inset-0 rounded-2xl bg-violet-500/40 blur-lg transition-all duration-500 group-hover/logo:bg-violet-400/60" />

  {/* Logo */}
  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 shadow-lg shadow-violet-600/30 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-3 group-hover/logo:shadow-violet-500/50">

    <div className="relative h-7 w-7">
      {/* C shape */}
      <div className="absolute inset-0 rounded-full border-[5px] border-white/95 border-r-transparent rotate-[-35deg]" />

      {/* Sync dot 1 */}
      <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-white shadow-sm" />

      {/* Sync dot 2 */}
      <span className="absolute -bottom-0.5 left-0 h-2 w-2 rounded-full bg-blue-200 shadow-sm" />
    </div>

  </div>
</div>

          {/* Logo Text */}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-violet-300">
              CrewSync
            </h1>

            <p className="text-xs font-medium text-slate-400">
              HR Management
            </p>
          </div>

        </div>

        <p className="mt-3 text-sm text-slate-500">
          HR Management System
        </p>

      </div>


      {/* ================= MENU ================= */}
      <nav className="flex-1 overflow-y-auto p-5">

        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Main Menu
        </p>

        <div className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.text}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-4 py-3.5 font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25"
                      : "text-slate-300 hover:-translate-y-0.5 hover:bg-slate-800/80 hover:text-white hover:shadow-lg hover:shadow-black/10"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active glow */}
                    {isActive && (
                      <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                    )}

                    {/* Hover background */}
                    <span
                      className={`absolute inset-0 -translate-x-full bg-white/5 transition-transform duration-500 group-hover:translate-x-0 ${
                        isActive ? "hidden" : ""
                      }`}
                    />

                    {/* Icon */}
                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white/15"
                          : "bg-slate-800/70 group-hover:scale-110 group-hover:bg-violet-500/20 group-hover:text-violet-300"
                      }`}
                    >
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.4 : 2}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>

                    {/* Text */}
                    <span className="relative z-10 flex-1 text-left">
                      {item.text}
                    </span>

                    {/* Arrow */}
                    <ChevronRight
                      size={17}
                      className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}

        </div>

      </nav>


      {/* ================= BOTTOM SECTION ================= */}
      <div className="space-y-4 border-t border-slate-800 p-5">

        {/* Promo Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-5 shadow-lg shadow-violet-900/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-violet-500/20">

          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-xl transition-transform duration-700 group-hover:scale-150" />

          <div className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-blue-300/10 blur-xl transition-transform duration-700 group-hover:scale-150" />

          <div className="relative">

            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              ✨
            </div>

            <h3 className="text-lg font-bold">
              Automate HR
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-violet-100">
              Empower your workforce with CrewSync.
            </p>

            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-violet-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-lg active:scale-95"
            >
              Learn More
            </button>

          </div>

        </div>


        {/* User Profile */}
        <div className="group flex cursor-pointer items-center gap-3 rounded-2xl p-2 transition-all duration-300 hover:bg-slate-800/80">

          <div className="relative">

            <img
              src="https://i.pravatar.cc/100?img=5"
              alt="Binita Biswas"
              className="h-11 w-11 rounded-full border-2 border-violet-500 object-cover transition-all duration-300 group-hover:scale-105 group-hover:border-violet-300 group-hover:shadow-lg group-hover:shadow-violet-500/20"
            />

            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />

          </div>

          <div className="min-w-0 flex-1">

            <h4 className="truncate text-sm font-semibold text-white transition-colors duration-300 group-hover:text-violet-300">
              Binita Biswas
            </h4>

            <p className="text-xs text-slate-400">
              HR Manager
            </p>

          </div>

          <ChevronRight
            size={16}
            className="text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-300"
          />

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;