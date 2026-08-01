function WelcomeBanner() {
  return (
    <div className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white flex items-center justify-between">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, Admin 👋
        </h1>

        <p className="mt-3 text-violet-100">
          Here's what's happening with your company today.
        </p>
      </div>

      <div className="hidden lg:block">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4">
          <p className="text-sm">Today's Date</p>
          <h2 className="text-2xl font-bold">
            01 Aug 2026
          </h2>
        </div>
      </div>

    </div>
  );
}

export default WelcomeBanner;