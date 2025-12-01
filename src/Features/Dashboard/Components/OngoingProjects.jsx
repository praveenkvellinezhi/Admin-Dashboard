import React from "react";
import { RefreshCcw } from "lucide-react";
import profile from "../../../assets/Images/profile.jpg";

function OngoingProjects() {
  const projects = [
    {
      logo: profile,
      title: "Aspire Zones X",
      subtitle: "Redesign",
      status: "On-going",
      progress: 70,
      due: "December 10, 2025",
      employees: [profile, profile, profile, profile],
    },
    {
      logo: profile,

      title: "Client Management",
      subtitle: "UI/UX",
      status: "Completed",
      progress: 100,
      due: "January 05, 2025",
      employees: [profile, profile, profile],
    },
    {
      logo: profile,

      title: "Project Tracker",
      subtitle: "Full Stack",
      status: "Pending",
      progress: 45,
      due: "November 28, 2025",
      employees: [profile, profile],
    },
    {
      logo: profile,

      title: "Inventory System",
      subtitle: "Backend",
      status: "On-going",
      progress: 60,
      due: "December 20, 2025",
      employees: [profile, profile, profile],
    },
  ];

  return (
    <div className="bg-[#FFEBEB] rounded-3xl p-4 sm:p-6 w-full">
      {/* Section Header */}
      <div className="flex items-center mb-4 sm:mb-5">
        <div className="bg-white rounded-4xl w-8 h-8 flex items-center justify-center shadow-sm">
          <RefreshCcw className="w-4 h-4" />
        </div>

        <h2 className="font-semibold ml-2 text-lg sm:text-xl">
          On Going Projects
        </h2>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {projects.map((p, index) => (
          <div
            key={index}
            className="
              bg-white rounded-xl p-3 sm:p-4 
              flex flex-col sm:flex-row 
              sm:items-start justify-between 
              shadow-sm gap-3 sm:gap-0
            "
          >
            {/* LEFT SECTION */}
            <div className="flex items-start gap-3 flex-1">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                <img
                  src={p.logo}
                  alt="project logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg leading-tight">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm">{p.subtitle}</p>

                {/* Grid Info */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 text-sm">
                  <div>
                    <p className="font-semibold">Status</p>
                    <p className="text-gray-600">{p.status}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Progress</p>
                    <p className="text-gray-600">{p.progress}%</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <p className="font-semibold">Due date</p>
                    <p className="text-gray-600 truncate">{p.due}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Employee Avatars */}
            <div className="flex -space-x-2 mt-1 sm:mt-0 sm:self-center">
              {p.employees?.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  alt="employee"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OngoingProjects;
