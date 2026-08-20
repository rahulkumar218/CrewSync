import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const toggleSidebar = () => {
      setSidebarOpen((prev) => !prev);
    };

    window.addEventListener(
      "toggle-sidebar",
      toggleSidebar
    );

    return () => {
      window.removeEventListener(
        "toggle-sidebar",
        toggleSidebar
      );
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-72
          transition-transform duration-300 ease-in-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />
      </aside>


      {/* ================= MAIN AREA ================= */}
      <div
        className={`
          flex min-h-screen min-w-0 flex-1 flex-col
          transition-all duration-300 ease-in-out
          ${
            sidebarOpen
              ? "ml-72"
              : "ml-0"
          }
        `}
      >

        {/* ================= NAVBAR ================= */}
        <div className="sticky top-0 z-50 bg-slate-100">
          <Navbar />
        </div>


        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 p-8">
          {children}
        </main>


        {/* ================= FOOTER ================= */}
        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;