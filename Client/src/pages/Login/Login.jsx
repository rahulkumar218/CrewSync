import { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import illustration from "../../assets/images/login-illustration.png.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // JWT Token save
      localStorage.setItem("token", data.token);

      // User information save
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login successful");

      // Dashboard par redirect
      window.location.href = "/dashboard";

    } catch (err) {
      console.error("Login Error:", err);

      setError(
        "Unable to connect to server. Please make sure backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ================= LEFT SIDE ================= */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#2563EB] text-white p-16 flex-col justify-center gap-10">

        {/* Background Blur */}

        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>


        {/* Logo + Text */}

        <div className="relative z-10">

          <div className="flex items-center gap-3 mb-16">

            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">

              <HiOutlineUserGroup className="text-indigo-600 text-3xl" />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                CrewSync
              </h2>

              <p className="text-blue-100 text-sm">
                HR Management System
              </p>

            </div>

          </div>


          <h1 className="text-6xl font-bold leading-tight">

            Sync your team.

            <br />

            <span className="text-blue-200">
              Simplify HR.
            </span>

          </h1>


          <p className="mt-8 text-xl text-blue-100 max-w-md leading-8">

            CrewSync helps you manage your workforce
            efficiently and effortlessly.

          </p>

        </div>


        {/* Illustration */}

        <div className="relative flex justify-center items-end flex-1">

          {/* Employees Card */}

          <div className="absolute left-0 top-8 bg-white rounded-2xl shadow-xl px-5 py-4 z-20">

            <p className="text-xs text-gray-500">
              Employees
            </p>

            <h3 className="text-2xl font-bold text-gray-800">
              248+
            </h3>

          </div>


          {/* Attendance Card */}

          <div className="absolute right-0 top-20 bg-white rounded-2xl shadow-xl px-5 py-4 z-20">

            <p className="text-xs text-gray-500">
              Attendance
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              98%
            </h3>

          </div>


          {/* Main Illustration */}

          <img
            src={illustration}
            alt="CrewSync Illustration"
            className="w-[720px] object-contain relative z-10"
          />

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-10">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 p-10">


          {/* Icon */}

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

            <HiOutlineUserGroup className="text-white text-3xl" />

          </div>


          {/* Heading */}

          <h2 className="text-4xl font-bold text-gray-900 mt-6">

            Welcome Back 👋

          </h2>


          <p className="text-gray-500 mt-3 mb-8">

            Sign in to continue to CrewSync

          </p>


          {/* ERROR MESSAGE */}

          {error && (

            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">

              {error}

            </div>

          )}


          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>


            {/* EMAIL */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">

                Email

              </label>


              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* PASSWORD */}

            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">

                Password

              </label>


              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />


                {showPassword ? (

                  <FiEyeOff
                    onClick={() => setShowPassword(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xl hover:text-indigo-600 transition"
                  />

                ) : (

                  <FiEye
                    onClick={() => setShowPassword(true)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xl hover:text-indigo-600 transition"
                  />

                )}

              </div>

            </div>


            {/* REMEMBER + FORGOT */}

            <div className="flex items-center justify-between mb-6">

              <label className="flex items-center gap-2 text-sm text-gray-600">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                />

                Remember me

              </label>


              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </button>

            </div>


            {/* SIGN IN */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-[#6D5BFF] to-[#4F46E5] text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-2xl hover:scale-[1.02]"
              }`}
            >

              {loading ? "Signing In..." : "Sign In"}

            </button>

          </form>


          {/* OR */}

          <div className="flex items-center my-6">

            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="px-4 text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>

          </div>


          {/* GOOGLE */}

          <button
            type="button"
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


          {/* SIGN UP */}

          <div className="mt-6 text-center text-sm text-gray-500">

            Don't have an account?{" "}

            <button
              type="button"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Sign Up
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;