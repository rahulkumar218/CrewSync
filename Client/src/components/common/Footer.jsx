function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white px-8 py-6 transition-all duration-300">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-lg font-bold text-white shadow-md shadow-violet-500/20 transition-all duration-300 hover:scale-105 hover:rotate-3">
            C
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800">
              CrewSync
            </h3>

            <p className="text-xs text-slate-400">
              Smart HR Management
            </p>
          </div>

        </div>


        {/* Center Message */}
        <div className="text-center">

          <p className="text-sm text-slate-500">
            © 2026 CrewSync. All rights reserved.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Making workforce management simple & smarter.
          </p>

        </div>


        {/* Links */}
        <div className="flex items-center gap-5">

          <button
            type="button"
            className="text-sm text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-violet-600"
          >
            Privacy
          </button>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <button
            type="button"
            className="text-sm text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-violet-600"
          >
            Terms
          </button>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <button
            type="button"
            className="text-sm text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-violet-600"
          >
            Support
          </button>

        </div>

      </div>


      {/* Bottom Accent */}
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

    </footer>
  );
}

export default Footer;