import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import illustration from "../../assets/images/login-illustration.png.png";
function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Left Side */}
      
   <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#2563EB] text-white p-16 flex-col justify-between">
   <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

<div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">

    <h1 className="text-5xl font-bold">
      CrewSync
    </h1>

    <p className="mt-5 text-lg text-blue-100 leading-8">
      Manage employees, attendance, payroll and HR operations
      from one beautiful dashboard.
    </p>

    <div className="mt-10 grid grid-cols-2 gap-4">

      <div className="bg-white/10 rounded-2xl p-4">
        <h2 className="text-3xl font-bold">250+</h2>
        <p className="text-blue-100">Employees</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-4">
        <h2 className="text-3xl font-bold">98%</h2>
        <p className="text-blue-100">Attendance</p>
      </div>

    </div>

  </div>
  <div className="flex justify-center mt-10">
  <img
    src={illustration}
    alt="CrewSync Illustration"
    className="w-[430px] relative z-10"
  />
</div>

</div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
  <HiOutlineUserGroup className="text-white text-3xl" />
</div>

         <h2 className="text-3xl font-bold text-gray-900 mt-6">
  Welcome Back 👋
</h2>

<p className="text-gray-500 mt-3 mb-8">
  Sign in to continue to CrewSync
</p>
<div className="mb-5">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email
  </label>

  <input
    type="email"
    placeholder="Enter your email"
    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Password
  </label>

  <input
    type="password"
    placeholder="Enter your password"
    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="flex items-center justify-between mb-6">

  <label className="flex items-center gap-2 text-sm text-gray-600">
    <input
      type="checkbox"
      className="w-4 h-4 accent-blue-600"
    />
    Remember me
  </label>

  <a
    href="#"
    className="text-sm text-blue-600 hover:text-blue-700"
  >
    Forgot Password?
  </a>

</div>
<button
  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
>
  Sign In
</button>
<div className="flex items-center my-6">
  <div className="flex-1 h-px bg-gray-200"></div>

  <span className="px-4 text-sm text-gray-400">
    OR
  </span>

  <div className="flex-1 h-px bg-gray-200"></div>
</div>
<button
  className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />

  <span className="font-medium text-gray-700">
    Continue with Google
  </span>
</button>
        </div>

      </div>

    </div>
  );
}

export default Login;