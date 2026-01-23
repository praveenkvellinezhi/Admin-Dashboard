import React from "react";
import logo2 from "../../assets/Logo/Logo3.png";
import logo4 from "../../assets/Logo/logo4.png";

import { NavLink, useNavigate } from "react-router-dom";
import {
  ChartLine,
  Calendar,
  Users,
  UserPlus,
  Folder,
  LogOut,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Slices/adminauthSlice";

export default function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navbar = [
    { name: "Dashboard", path: "/", icon: <ChartLine size={22} /> },
    { name: "Projects", path: "/Projects", icon: <Folder size={22} /> },
    { name: "Attendence", path: "/Attendence", icon: <Calendar size={22} /> },
    { name: "Employeee", path: "/employees", icon: <Users size={22} /> },
    { name: "Interns", path: "/Interns", icon: <UserPlus size={22} /> },
  ];

  /* =========================
     LOGOUT HANDLER
  ========================= */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="
        h-full bg-[#ECECEC] shadow fixed top-0 left-0 z-40
        w-20 lg:hover:w-64
        transition-[width] duration-300
        overflow-hidden
      "
    >
      {/* LOGO */}
      <div className="px-4 py-4 h-20 flex items-center relative">
        <img
          src={logo2}
          className="w-12 mt-16 transition-all duration-300"
          alt="collapsed logo"
        />

        <div className="mt-16 flex items-center absolute opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
          <img src={logo2} className="w-14" alt="logo2-hover" />
          <img src={logo4} className="w-20" alt="logo4-hover" />
        </div>
      </div>

      {/* MENU */}
      <div className="flex flex-col mt-6">
        {navbar.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center gap-4 px-5 py-3 my-1
              rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-[#454B57] text-white rounded-l-full"
                  : "text-black hover:bg-gray-100"
              }
            `
            }
          >
            <div className="min-w-[22px] flex justify-center">
              {item.icon}
            </div>

            <span
              className={`transition-opacity duration-300 whitespace-nowrap font-semibold
                ${isOpen ? "opacity-100" : "opacity-0"}`}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>

      {/* LOGOUT (BOTTOM) */}
      <div className="absolute bottom-6 w-full px-3">
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-4 w-full px-4 py-3
            rounded-xl text-red-600 hover:bg-red-100
            transition-all duration-300
          "
        >
          <div className="min-w-[22px] flex justify-center">
            <LogOut size={22} />
          </div>

          <span
            className={`whitespace-nowrap font-semibold transition-opacity duration-300
              ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
