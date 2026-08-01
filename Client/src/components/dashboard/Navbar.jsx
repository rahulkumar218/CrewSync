import { Search, Bell } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-6 py-4 flex items-center justify-between">

      {/* Search */}
      <div className="relative w-96">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search employees..."
          className="w-full bg-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <button className="relative">
          <Bell size={24} className="text-gray-700" />

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="profile"
            className="w-11 h-11 rounded-full"
          />

          <div>
            <h4 className="font-semibold">
              Admin
            </h4>

            <p className="text-sm text-gray-500">
              HR Manager
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;