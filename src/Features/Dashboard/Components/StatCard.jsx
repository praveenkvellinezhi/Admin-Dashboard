import React from "react";
import { FaUser, FaUsers, FaFolder, FaTasks } from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    { title: "Active Employees", icon: <FaUser />, value: 50 },
    { title: "Active Interns", icon: <FaUsers />, value: 20 },
    { title: "Number of Project", icon: <FaFolder />, value: 100 },
    { title: "Number of Task", icon: <FaTasks />, value: 67 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="
            bg-white shadow-md rounded-2xl p-5 
            flex flex-col justify-center
            min-w-[220px] w-full
          "
        >
          <h3 className="text-sm font-semibold text-gray-600">{item.title}</h3>

          <div className="flex items-center gap-4 mt-2">
            <div className="text-gray-700 text-2xl">{item.icon}</div>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
