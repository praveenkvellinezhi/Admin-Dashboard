import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../Redux/Slices/adminauthSlice";

import logo from "../../assets/Logo/logo.png";

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
    const result = await dispatch(adminLogin(formData));
    if (adminLogin.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white flex items-center justify-center">
      <div className="absolute inset-0">
        <div
          className="
            absolute top-0 right-[-20%]
            h-full w-[70%]
            bg-slate-700
            transform -skew-x-12
          "
        />
      </div>

      <div
        className="
          relative z-10
          shadow-[0_20px_40px_rgba(0,0,0,0.3)]
          w-full max-w-5xl h-[460px]
          bg-transparent rounded-2xl 
          overflow-hidden
          grid grid-cols-2
        "
      >
        <div className="flex flex-col items-center justify-center bg-transparent">
          <img src={logo} alt="logo" className=" h-36 mb-4" />
        
        </div>

        <div className="relative flex items-center">
          <div
            className="
              absolute inset-y-0 right-[-70px]
              
             
              transform -skew-x-12
              z-10
            "
          />

          <div className="absolute inset-0" />

          <form
            onSubmit={handleSubmit}
            className="relative z-20 w-full px-12 text-white space-y-5"
          >
            <h3 className="text-2xl font-semibold mb-6">
              Sign in to your account
            </h3>

            <div>
              <label className="block text-xs text-white mb-1">
                Your email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="
                  w-full px-4 py-2 rounded-md
                  text-sm text-slate-800
                  bg-white
                  focus:outline-none focus:ring-2 focus:ring-slate-400
                "
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="
                  w-full px-4 py-2 rounded-md
                  text-sm text-slate-800
                  bg-white
                  focus:outline-none focus:ring-2 focus:ring-slate-400
                "
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="
                w-full py-2 mt-3 rounded-md
                bg-slate-900 hover:bg-slate-800
                transition disabled:opacity-60
              "
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>

            {error && (
              <p className="text-red-300 text-xs mt-2">
                {error?.message || "Login failed"}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
