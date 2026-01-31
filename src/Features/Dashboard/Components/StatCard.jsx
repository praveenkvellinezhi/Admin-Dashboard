import React from "react";
import { FaUser, FaUsers, FaFolder, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StatsSection() {
  const { data } = useSelector((state) => state.stats);

  const stats = [
    {
      title: "Active Employees",
      icon: <FaUser />,
      value: data.active_employees,
      gradient: "from-purple-500 to-indigo-400",
      path: "/employees",
    },
    {
      title: "Active Interns",
      icon: <FaUsers />,
      value: data.active_interns,
      gradient: "from-blue-500 to-sky-400",
      path: "/interns",
    },
    {
      title: "Number of Projects",
      icon: <FaFolder />,
      value: data.project_count,
      gradient: "from-green-500 to-emerald-400",
      path: "/projects",
    },
    {
      title: "Attendance",
      icon: <FaTasks />,
      value: `${data.attendance_percent}%`,
      gradient: "from-orange-400 to-pink-400",
      path: "/attendance",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 w-full">
      {stats.map((item) => (
        <Link to={item.path} key={item.title}>
          <div
            className={`
              relative overflow-hidden
              rounded-2xl p-5 min-h-[140px]
              bg-gradient-to-br ${item.gradient}
              text-white shadow-lg
              transition hover:scale-105 hover:shadow-xl
            `}
          >
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/30 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/20 rounded-full blur-xl" />

            <div className="relative z-10">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/25 mb-4">
                <span className="text-xl">{item.icon}</span>
              </div>

              <p className="text-sm opacity-90">{item.title}</p>
              <h2 className="text-2xl font-semibold mt-1">{item.value}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
