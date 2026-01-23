import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../Redux/Slices/adminauthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.adminauth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(adminLogin(formData));
    if (adminLogin.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT BRAND SECTION */}
        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700">NS</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              NSOC DASHBOARD
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage • Monitor • Secure
            </p>
          </div>
        </div>

        {/* RIGHT LOGIN SECTION */}
        <div className="flex items-center justify-center bg-gray-700 p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Sign in to your account
            </h3>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Your email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md text-sm
                           bg-gray-100 border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md text-sm
                           bg-gray-100 border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <span className="cursor-pointer hover:underline">
                Recover password
              </span>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2 rounded-md text-sm font-medium
                         bg-gray-900 text-white
                         hover:bg-gray-800 transition
                         disabled:opacity-60"
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>

            {error && (
              <p className="text-xs text-red-400 mt-2">
                {error?.message || "Login failed"}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
