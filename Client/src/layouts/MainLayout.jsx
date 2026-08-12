import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Footer from "../components/common/Footer";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-72">
        <Sidebar />
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="ml-72 flex min-h-screen min-w-0 flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;