import React from "react";
import { RefreshCcw } from "lucide-react";

function OngoingProjects() {
  const projects = [
    {
      title: "Aspire Zones X",
      subtitle: "Redesign",
      status: "On-going",
      progress: 70,
      due: "December 10, 2025",
    },
    {
      title: "Client Management",
      subtitle: "UI/UX",
      status: "Completed",
      progress: 100,
      due: "January 05, 2025",
    },
    {
      title: "Project Tracker",
      subtitle: "Full Stack",
      status: "Pending",
      progress: 45,
      due: "November 28, 2025",
    },
    {
      title: "Inventory System",
      subtitle: "Backend",
      status: "On-going",
      progress: 60,
      due: "December 20, 2025",
    },
  ];

  return (
    <div className="bg-gray-200 rounded-3xl p-6 w-full ml-3">
      {/* Section Header */}
      <div className="flex items-center mb-5">
        <div className="bg-white rounded-4xl w-8 h-8 flex items-center justify-center shadow-sm">
          <RefreshCcw />
        </div>

        <h2 className="font-semibold ml-2 text-xl">On Going Projects</h2>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {projects.map((p, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 flex items-start justify-between shadow-sm"
          >
            {/* LEFT SECTION */}
            <div className="flex items-start gap-3">
              {/* Icon with First Letter */}
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">
                {p.title.charAt(0)}
              </div>

              {/* Text Section */}
              <div>
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-gray-500 text-sm">{p.subtitle}</p>

                {/* Grid Info */}
                <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
                  <div>
                    <p className="font-semibold">Status</p>
                    <p className="text-gray-600">{p.status}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Presentation</p>
                    <p className="text-gray-600">{p.progress}%</p>
                  </div>
                  <div>
                    <p className="font-semibold">Due date</p>
                    <p className="text-gray-600">{p.due}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Grey Dots */}
            <div className="flex space-x-1 mt-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OngoingProjects;
