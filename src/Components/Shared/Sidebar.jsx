import React from "react";
import logo4 from "../../assets/Logo/logo.png";

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

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navbar = [
    { name: "Dashboard", path: "/", icon: <ChartLine size={22} /> },
    { name: "Projects", path: "/projects", icon: <Folder size={22} /> },
    { name: "Attendence", path: "/attendence", icon: <Calendar size={22} /> },
    { name: "Employeee", path: "/employees", icon: <Users size={22} /> },
    { name: "Interns", path: "/interns", icon: <UserPlus size={22} /> },
  ];

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className="
        group
        fixed top-0 left-0 z-40 h-full
        bg-[#ECECEC] shadow
        w-20 lg:hover:w-64
        transition-[width] duration-300
        overflow-hidden
      "
    >
      {/* LOGO */}
      <div className="h-20 flex items-center justify-center px-4">
        <img
          src={logo4}
          alt="logo"
          className="
            w-12
            lg:group-hover:w-36
            transition-all duration-300
          "
        />
      </div>

      {/* MENU */}
      <div className="flex flex-col mt-6 px-2">
        {navbar.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center gap-4 px-4 py-3 my-1
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
              className="
                whitespace-nowrap font-semibold
                opacity-0 lg:group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="absolute bottom-6 w-full px-2">
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
            className="
              whitespace-nowrap font-semibold
              opacity-0 lg:group-hover:opacity-100
              transition-opacity duration-300
            "
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
