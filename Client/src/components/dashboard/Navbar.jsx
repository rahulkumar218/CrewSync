import {
  Search,
  Bell,
  Menu,
  Mail,
  ChevronDown,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // ================= DARK MODE =================
  const [darkMode, setDarkMode] = useState(() => {
    const savedSettings = localStorage.getItem("crewsync-settings");

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        return settings.appearance?.theme === "dark";
      } catch {
        return false;
      }
    }

    return localStorage.getItem("theme") === "dark";
  });

  // ================= STATES =================
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ================= REFS =================
  const notificationRef = useRef(null);
  const messageRef = useRef(null);
  const profileRef = useRef(null);

  // ================= THEME =================
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

    let settings = {};

    const savedSettings =
      localStorage.getItem("crewsync-settings");

    if (savedSettings) {
      try {
        settings = JSON.parse(savedSettings);
      } catch {
        settings = {};
      }
    }

    settings = {
      ...settings,
      appearance: {
        ...(settings.appearance || {}),
        theme: darkMode ? "dark" : "light",
      },
    };

    localStorage.setItem(
      "crewsync-settings",
      JSON.stringify(settings)
    );
  }, [darkMode]);

  // ================= CLOSE DROPDOWNS =================
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        messageRef.current &&
        !messageRef.current.contains(event.target)
      ) {
        setShowMessages(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ================= MENU =================
  const handleMenuClick = () => {
    window.dispatchEvent(new Event("toggle-sidebar"));
  };

  // ================= PROFILE =================
  const handleProfile = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  const handleSettings = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  return (
    <div
      className="
        bg-white rounded-3xl shadow-sm
        px-8 py-5
        flex items-center justify-between
        transition-all duration-300
        dark:bg-white
      "
    >

      {/* ================================================= */}
      {/* LEFT SIDE */}
      {/* ================================================= */}

      <div className="flex items-center gap-6">

        {/* ================= MENU ================= */}

        <button
          type="button"
          onClick={handleMenuClick}
          title="Menu"
          className="
            group
            flex items-center justify-center
            rounded-xl
            transition-all duration-300
            hover:bg-slate-100
            hover:-translate-y-0.5
            active:scale-95
          "
        >
          <Menu
            size={22}
            className="
              text-gray-600
              transition-all duration-300
              group-hover:text-violet-600
              group-hover:rotate-3
            "
          />
        </button>


        {/* ================= SEARCH ================= */}

        <div className="relative group">

          <Search
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-gray-400
              transition-all duration-300
              group-focus-within:text-violet-600
              group-focus-within:scale-110
            "
            size={20}
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search employees, departments..."
            className="
              w-[380px]
              pl-12 pr-10 py-3
              rounded-xl
              bg-slate-100
              outline-none
              text-slate-700
              placeholder:text-slate-400
              transition-all duration-300

              focus:bg-white
              focus:ring-2
              focus:ring-violet-500/30
              focus:shadow-md
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute right-3 top-1/2
                -translate-y-1/2
                text-slate-400
                transition-all duration-200
                hover:text-violet-600
                hover:scale-110
                active:scale-90
              "
            >
              <X size={17} />
            </button>
          )}

        </div>

      </div>


      {/* ================================================= */}
      {/* RIGHT SIDE */}
      {/* ================================================= */}

      <div className="flex items-center gap-6">


        {/* ================= NOTIFICATIONS ================= */}

        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() => {
              setShowNotifications(
                !showNotifications
              );

              setShowMessages(false);
              setShowProfile(false);
            }}
            title="Notifications"
            className="
              group
              relative
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              transition-all duration-300
              hover:bg-slate-100
              hover:-translate-y-0.5
              active:scale-95
            "
          >

            <Bell
              size={22}
              className="
                text-gray-600
                transition-all duration-300
                group-hover:text-violet-600
                group-hover:rotate-12
              "
            />

            {/* Notification Count */}

            <span
              className="
                absolute
                -top-2 -right-2
                bg-violet-600
                text-white
                text-[10px]
                font-semibold
                w-5 h-5
                rounded-full
                flex items-center justify-center
                shadow-md
                animate-pulse
              "
            >
              3
            </span>

          </button>


          {/* Notification Dropdown */}

          {showNotifications && (
            <div
              className="
                absolute right-0 top-14
                w-80
                bg-white
                rounded-2xl
                shadow-2xl
                border border-slate-200
                overflow-hidden
                z-50

                animate-[fadeIn_.2s_ease-out]
              "
            >

              <div
                className="
                  px-5 py-4
                  border-b border-slate-100
                  flex items-center justify-between
                "
              >

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Notifications
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    You have 3 new notifications
                  </p>
                </div>

                <span
                  className="
                    bg-violet-100
                    text-violet-600
                    px-2 py-1
                    rounded-lg
                    text-xs
                    font-semibold
                  "
                >
                  3 New
                </span>

              </div>


              <div>

                <div
                  className="
                    px-5 py-4
                    cursor-pointer
                    transition-all duration-200
                    hover:bg-slate-50
                    hover:pl-6
                  "
                >
                  <p className="text-sm font-medium text-slate-700">
                    New employee added
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    10 minutes ago
                  </p>
                </div>


                <div
                  className="
                    px-5 py-4
                    cursor-pointer
                    border-t border-slate-100
                    transition-all duration-200
                    hover:bg-slate-50
                    hover:pl-6
                  "
                >
                  <p className="text-sm font-medium text-slate-700">
                    Leave request received
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    1 hour ago
                  </p>
                </div>


                <div
                  className="
                    px-5 py-4
                    cursor-pointer
                    border-t border-slate-100
                    transition-all duration-200
                    hover:bg-slate-50
                    hover:pl-6
                  "
                >
                  <p className="text-sm font-medium text-slate-700">
                    Monthly payroll is ready
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    3 hours ago
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>


        {/* ================= MAIL ================= */}

        <div
          ref={messageRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() => {
              setShowMessages(!showMessages);

              setShowNotifications(false);
              setShowProfile(false);
            }}
            title="Messages"
            className="
              group
              relative
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              transition-all duration-300
              hover:bg-slate-100
              hover:-translate-y-0.5
              active:scale-95
            "
          >

            <Mail
              size={22}
              className="
                text-gray-600
                transition-all duration-300
                group-hover:text-violet-600
                group-hover:-rotate-6
              "
            />

            <span
              className="
                absolute
                -top-2 -right-2
                bg-violet-600
                text-white
                text-[10px]
                font-semibold
                w-5 h-5
                rounded-full
                flex items-center justify-center
                shadow-md
              "
            >
              2
            </span>

          </button>


          {/* Message Dropdown */}

          {showMessages && (
            <div
              className="
                absolute right-0 top-14
                w-80
                bg-white
                rounded-2xl
                shadow-2xl
                border border-slate-200
                overflow-hidden
                z-50
              "
            >

              <div className="px-5 py-4 border-b border-slate-100">

                <h3 className="font-semibold text-slate-800">
                  Messages
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  2 unread messages
                </p>

              </div>


              <div>

                <div
                  className="
                    px-5 py-4
                    cursor-pointer
                    transition-all duration-200
                    hover:bg-slate-50
                    hover:pl-6
                  "
                >
                  <p className="text-sm font-semibold text-slate-700">
                    Rahul Sharma
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Can you review the leave request?
                  </p>
                </div>


                <div
                  className="
                    px-5 py-4
                    cursor-pointer
                    border-t border-slate-100
                    transition-all duration-200
                    hover:bg-slate-50
                    hover:pl-6
                  "
                >
                  <p className="text-sm font-semibold text-slate-700">
                    Priya Singh
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Payroll report is ready.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>


        {/* ================= DARK MODE ================= */}

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          title={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
          className="
            group
            w-10 h-10
            rounded-xl
            bg-slate-100
            hover:bg-slate-200
            flex items-center justify-center
            transition-all duration-300
            hover:-translate-y-0.5
            active:scale-90
          "
        >

          {darkMode ? (
            <Sun
              size={20}
              className="
                text-yellow-500
                transition-transform duration-500
                group-hover:rotate-45
              "
            />
          ) : (
            <Moon
              size={20}
              className="
                text-slate-600
                transition-transform duration-500
                group-hover:rotate-12
              "
            />
          )}

        </button>


        {/* ================= PROFILE ================= */}

        <div
          ref={profileRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() => {
              setShowProfile(!showProfile);

              setShowNotifications(false);
              setShowMessages(false);
            }}
            className="
              flex items-center gap-3
              cursor-pointer
              rounded-2xl
              p-2
              transition-all duration-300
              hover:bg-slate-100
              hover:-translate-y-0.5
              active:scale-[0.98]
            "
          >

            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Binita Biswas"
              className="
                w-12 h-12
                rounded-full
                object-cover
                transition-all duration-300
                hover:scale-105
                hover:ring-2
                hover:ring-violet-400
                hover:ring-offset-2
              "
            />


            <div className="text-left">

              <h3
                className="
                  font-semibold
                  text-slate-800
                  transition-colors duration-300
                  hover:text-violet-600
                "
              >
                Binita Biswas
              </h3>

              <p className="text-sm text-gray-500">
                HR Manager
              </p>

            </div>


            <ChevronDown
              size={18}
              className={`
                text-slate-500
                transition-transform duration-300
                ${showProfile ? "rotate-180" : ""}
              `}
            />

          </button>


          {/* Profile Dropdown */}

          {showProfile && (
            <div
              className="
                absolute right-0 top-16
                w-56
                rounded-2xl
                bg-white
                border border-slate-200
                shadow-2xl
                p-2
                overflow-hidden
                z-50
              "
            >

              <button
                type="button"
                onClick={handleProfile}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-sm
                  text-slate-600
                  transition-all duration-200
                  hover:bg-slate-100
                  hover:text-violet-600
                  hover:pl-5
                "
              >
                <User size={17} />
                My Profile
              </button>


              <button
                type="button"
                onClick={handleSettings}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-sm
                  text-slate-600
                  transition-all duration-200
                  hover:bg-slate-100
                  hover:text-violet-600
                  hover:pl-5
                "
              >
                <Settings size={17} />
                Settings
              </button>


              <div className="my-1 border-t border-slate-100" />


              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-sm
                  text-red-500
                  transition-all duration-200
                  hover:bg-red-50
                  hover:pl-5
                "
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;