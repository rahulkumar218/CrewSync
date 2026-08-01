import bannerBg from "../../assets/images/banner-bg.png";
function WelcomeBanner() {
  const today = new Date();

const formattedDate = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
  return (
  <div
    className="relative overflow-hidden rounded-3xl h-[240px] mt-8"
    style={{
      backgroundImage: `
linear-gradient(
rgba(91,70,255,0.25),
rgba(91,70,255,0.25)
),
url(${bannerBg})
`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="h-full flex items-center justify-between px-10">

      {/* Left Content */}
      <div className=" text-white max-w-xl">

        <h1 className="text-4xl font-bold leading-tight">
          Welcome back, Admin 👋
        </h1>

        <p className="mt-4 text-violet-100 text-lg">
          Here's what's happening with your company today.
        </p>

      </div>

      {/* Right Date Card */}
      <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 text-white">

        <p className="text-sm text-violet-100">
          Today's Date
        </p>

        <h2 className="text-2xl font-bold mt-1">
          {formattedDate}
        </h2>

      </div>

    </div>

    {/* Decorative Circles */}
    <div className="absolute -top-20 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

    <div className="absolute -bottom-20 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

  </div>
);
}

export default WelcomeBanner;