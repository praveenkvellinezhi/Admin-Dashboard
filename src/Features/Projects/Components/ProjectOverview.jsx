import React from "react";

export default function ProjectOverview({ project }) {
  const capitalizeFirst = (value) => {
    if (value === null || value === undefined || value === "") return "—";
    const str = String(value);
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // ✅ HARD GUARD
  if (!project) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-semibold mb-4">
        Project Overview
      </h3>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Item label="Project Name" value={capitalizeFirst(project.project_name)} />
        <Item label="Project ID" value={project.project_id || "—"} />
        <Item label="Client Name" value={capitalizeFirst(project.client_name)} />
        <Item label="Start Date" value={project.start_date || "—"} />
        <Item label="End Date" value={project.end_date || "—"} />
        <Item label="Status" value="Active" />
        <Item
          label="Project Manager"
          value={capitalizeFirst(project.project_manager_name)}
        />
        <Item label="Priority" value={capitalizeFirst(project.priority)} />
      </div>

      {/* TEAM MEMBERS */}
      <div className="mt-5">
        <p className="text-xs text-gray-500 mb-2">
          Team Members
        </p>

        {project.team_members?.length > 0 ? (
          <div className="flex -space-x-3">
            {project.team_members.map((member) => (
              <img
                key={member.employee_id} // ✅ FIXED KEY
                src={member.profile_image_url || "https://i.pravatar.cc/100"}
                alt={member.name}
                title={member.name}
                className="w-8 h-8 rounded-full border object-cover"
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No team members</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="mt-5">
        <p className="text-xs text-gray-500 mb-1">Description</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {capitalizeFirst(project.description)}
        </p>
      </div>
    </div>
  );
}

/* =========================
   REUSABLE ITEM
========================= */
function Item({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">
        {value || "—"}
      </p>
    </div>
  );
}
