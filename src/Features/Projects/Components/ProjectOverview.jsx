export default function ProjectOverview({ project }) {
    const capitalizeFirst = (value) => {
  if (value === null || value === undefined) return "—";

  const str = String(value); // 👈 force string
  return str.charAt(0).toUpperCase() + str.slice(1);
};

  // ✅ MANDATORY GUARD
  if (!project) {
    return null;
  }

  return (
    <div className="bg-white  rounded-xl shadow-sm p-5 ">
      <h3 className="text-sm font-semibold mb-4">
        Project Overview
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Item label="Project Name" value={capitalizeFirst(project.project_name) } />
        <Item label="Project Id" value={capitalizeFirst(project.project_id)} />
        <Item label="Client Name" value={capitalizeFirst(project.client_name)} />
        <Item label="Start Date" value={capitalizeFirst(project.start_date)} />
        <Item label="End Date" value={capitalizeFirst(project.end_date)} />
        <Item label="Status" value="Active" />
        <Item label="Project Manager" value={capitalizeFirst(project.project_manager_name)} />
        <Item label="Priority" value={capitalizeFirst(project.priority)} />
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">Team Members</p>
        <div className="flex -space-x-3">
          {project.team_members?.map((m) => (
            <img
              key={m.id}
              src={m.profile_image_url}
              alt={m.name}
              title={m.name}
              className="w-8 h-8 rounded-full border object-cover"
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">Description</p>
        <p className="text-sm text-gray-700">
          {capitalizeFirst(project.description) || "-"}
        </p>
      </div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
