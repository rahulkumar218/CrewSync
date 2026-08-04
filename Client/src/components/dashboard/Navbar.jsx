import { Search, Bell } from "lucide-react";
import {
  Menu,
  Mail,
  ChevronDown,
} from "lucide-react";
import { Moon } from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  return (
  <div className="bg-white rounded-3xl shadow-sm px-8 py-5 flex items-center justify-between">

    {/* Left */}

    <div className="flex items-center gap-6">

      <Menu className="text-gray-600 cursor-pointer" />

      <div className="relative">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          placeholder="Search employees, departments..."
          className="w-[380px] pl-12 pr-6 py-3 rounded-xl bg-slate-100 outline-none"
        />

      </div>

    </div>

    {/* Right */}

    <div className="flex items-center gap-6">

      <div className="relative cursor-pointer">
  <Bell className="text-gray-600" size={22} />

  <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
    3
  </span>
</div>
      <div className="relative cursor-pointer">
  <Mail className="text-gray-600" size={22} />

  <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
    2
  </span>
  
</div>
{/* 🌙 Dark Mode Button */}
<button
  onClick={() => setDarkMode(!darkMode)}
  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition duration-300"
>
  <Moon size={20} className="text-slate-600" />
</button>

      <div className="flex items-center gap-3 cursor-pointer">

        <img
          src="https://i.pravatar.cc/150?img=5"
          className="w-12 h-12 rounded-full"
        />

        <div>

          <h3 className="font-semibold">
            Binita Biswas
          </h3>

          <p className="text-sm text-gray-500">
            HR Manager
          </p>

        </div>

        <ChevronDown size={18} />

      </div>

    </div>

  </div>
);
}

export default Navbar;