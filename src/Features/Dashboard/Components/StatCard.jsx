import React from "react";
import { FaUser, FaUsers, FaFolder, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function StatsSection() {
  const stats = [
    { title: "Active Employees", icon: <FaUser />, value: 50, color:"bg-[#383030]", path: "/employees" },
    { title: "Active Interns", icon: <FaUsers />, value: 20, color:"bg-[#595651]", path: "/interns" },
    { title: "Number of Project", icon: <FaFolder />, value: 100, color:"bg-[#00471C]", path: "/projects" },
    { title: "Attendence", icon: <FaTasks />, value: '67%', color:"bg-[#001B4E]", path: "/Attendence" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-3 sm:p-4 w-full">

      {stats.map((item) => (
        <Link to={item.path} key={item.title}>
          <div
            className={`
              ${item.color}
              shadow-md rounded-2xl  min-h-[120px] mt-0
              p-4 sm:p-5
              flex flex-col justify-center
              transition hover:shadow-lg hover:scale-105 cursor-pointer
            `}
          >
            <h3 className=" text-sm sm:text-base lg:text-lg font-semibold text-white">
              {item.title}
            </h3>

            <div className="flex items-center gap-3 sm:gap-4 mt-2">
              <div className="text-white text-xl sm:text-2xl">
                {item.icon}
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                {item.value}
              </p>
            </div>
          </div>
        </Link>
      ))}

    </div>
  );
}
