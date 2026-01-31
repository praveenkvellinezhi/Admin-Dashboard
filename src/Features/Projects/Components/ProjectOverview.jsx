import React from "react";
import {
  Briefcase,
  User,
  Calendar,
  Flag,
  Users,
  FileText,
  Phone,
  Mail
} from "lucide-react";

export default function ProjectOverview({ project }) {
  if (!project) return null;
  const statusClasses = {
  pending: "bg-orange-100 text-orange-700",
  ongoing: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

<span
  className={`px-3 py-1 text-xs rounded-full font-medium
    ${statusClasses[project.status?.toLowerCase()] || "bg-gray-100 text-gray-700"}
  `}
>
  {project.status}
</span>


  const capitalize = (v) =>
    v ? v.charAt(0).toUpperCase() + v.slice(1) : "—";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {capitalize(project.project_name)}
          </h2>
          <p className="text-sm text-gray-500">
            ID: {project.project_id}
          </p>
        </div>

        <div className="flex gap-2">
          <span
  className={`px-3 py-1 text-xs rounded-full font-medium
    ${statusClasses[project.status?.toLowerCase()] || "bg-gray-100 text-gray-700"}
  `}
>
  {project.status}
</span>
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
            {capitalize(project.priority)} Priority
          </span>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InfoCard
          icon={<Briefcase size={16} />}
          label="Client"
          value={capitalize(project.client_name)}
        />
        <InfoCard
          icon={<User size={16} />}
          label="Manager"
          value={capitalize(project.project_manager_name)}
        />
        <InfoCard
          icon={<Calendar size={16} />}
          label="Start Date"
          value={project.start_date || "—"}
        />
        <InfoCard
          icon={<Calendar size={16} />}
          label="End Date"
          value={project.end_date || "—"}
        />
      </div>
      {/* CLIENT CONTACT */}
<div className="bg-gray-100 border border-gray-200 rounded-2xl p-5">
  <div className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-4">
    <div className="p-2 bg-blue-100 rounded-lg">
      <Mail size={16} className="text-blue-600" />
    </div>
    Client Contact
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* EMAIL */}
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <Mail size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Email Address</p>
          <p className="text-sm font-semibold text-gray-800">
            {project.client_email || "—"}
          </p>
        </div>
      </div>
    </div>

    {/* PHONE */}
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 rounded-full">
          <Phone size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Phone Number</p>
          <p className="text-sm font-semibold text-gray-800">
            {project.client_contact || "—"}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* TEAM MEMBERS */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
          <Users size={16} />
          Team Members
        </div>

        {project.team_members?.length ? (
          <div className="flex -space-x-3">
            {project.team_members.map((m) => (
              <img
                key={m.employee_id}
                src={m.profile_image_url || "https://i.pravatar.cc/100"}
                alt={m.name}
                title={m.name}
                className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No team members</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
          <FileText size={16} />
          Description
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {capitalize(project.description)}
        </p>
      </div>
    </div>
  );
}

/* ---------- Small reusable card ---------- */
function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border bg-gray-100 border-gray-200 rounded-xl p-4">
      <div className="text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}
