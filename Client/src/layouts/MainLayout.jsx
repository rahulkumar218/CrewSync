import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white px-8 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-sm text-slate-500">
              © 2026 CrewSync. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-sm text-slate-500">

              <span className="cursor-pointer hover:text-violet-600 transition">
                Privacy
              </span>

              <span className="cursor-pointer hover:text-violet-600 transition">
                Terms
              </span>

              <span className="cursor-pointer hover:text-violet-600 transition">
                Support
              </span>

            </div>

          </div>

        </footer>

      </div>

    </div>
  );
}

export default MainLayout;