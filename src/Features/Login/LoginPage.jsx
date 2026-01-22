import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../Redux/Slices/adminauthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error} = useSelector((state) => state.adminauth);

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
      navigate("/ ");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 mb-3"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Logging in..." : "Login"}
      </button>

      {error && <p className="text-red-500 mt-2">{error?.message || "login failed"}</p>}
    </form>
  );
}
