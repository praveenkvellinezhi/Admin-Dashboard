import React from "react";
import logo from "../../assets/Logo/logo.png";
import logo2 from "../../assets/Logo/Logo3.png";
import logo4 from "../../assets/Logo/logo4.png";

import { NavLink } from "react-router-dom";
import { ChartLine, Calendar, Users, UserPlus, Folder } from "lucide-react";

export default function Sidebar() {
  const navbar = [
    { name: "Dashboard", path: "/Dashboard", icon: <ChartLine size={22} /> },
    { name: "Attendence", path: "/Attendence", icon: <Calendar size={22} /> },
    { name: "Employeee", path: "/Employee", icon: <Users size={22} /> },
    { name: "Interns", path: "/Interns", icon: <UserPlus size={22} /> },
    { name: "Projects", path: "/Projects", icon: <Folder size={22} /> },
  ];

  return (
    <div
      className="
        h-full bg-white shadow fixed top-0 left-0 z-50 mt-16
        group w-20 hover:w-64
        transition-[width] duration-300 overflow-hidden
      "
    >
      {/* LOGO SECTION (same fixed height ensures smooth transition) */}
      <div className="px-4 py-4 h-20 flex items-center relative">

        {/* SMALL LOGO — Collapsed State */}
        <img
          src={logo2}
          className="
            w-12
            opacity-100 group-hover:opacity-0
            transition-all duration-300 transform group-hover:-translate-x-4
          "
          alt="collapsed logo"
        />

        {/* EXPANDED LOGO — Hover State */}
        <div
          className="
            flex items-center  absolute
            opacity-0 group-hover:opacity-100
            transition-all duration-300 transform group-hover:translate-x-6
          "
        >
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
                ${isActive ? "bg-gray-200 text-black" : "text-gray-700 hover:bg-gray-100"}
              `
            }
          >
            <div className="min-w-[22px] flex justify-center">{item.icon}</div>

            <span
              className="
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300 whitespace-nowrap
              "
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
