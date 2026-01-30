import React from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";

export default function OngoingProjects({ projects = {} }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
            <LayoutGrid size={18} className="text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">
            Ongoing Projects
          </h3>
        </div>

        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      {/* LIST */}
      <div className="divide-y divide-gray-200">
        <ProjectRow
          label="Completed"
          count={projects.completed}
          icon={<CheckCircle size={18} />}
          color="green"
        />

        <ProjectRow
          label="Assigned"
          count={projects.assigned}
          icon={<Clock size={18} />}
          color="blue"
        />

        <ProjectRow
          label="Pending"
          count={projects.pending}
          icon={<AlertCircle size={18} />}
          color="orange"
        />
      </div>
    </div>
  );
}

/* =========================
   PROJECT ROW
========================= */
const ProjectRow = ({ label, count = 0, icon, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color]}`}
        >
          {icon}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-800">
            {label}
          </span>

          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-medium">
            {count}
          </span>
        </div>
      </div>

      <button className="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
        View Details
      </button>
    </div>
  );
};
