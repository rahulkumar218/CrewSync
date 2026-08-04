function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">

        <p className="text-sm text-slate-500">
          © 2026 CrewSync. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a href="#" className="text-slate-500 hover:text-violet-600">
            Privacy Policy
          </a>

          <a href="#" className="text-slate-500 hover:text-violet-600">
            Terms of Service
          </a>

          <a href="#" className="text-slate-500 hover:text-violet-600">
            Help Center
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;