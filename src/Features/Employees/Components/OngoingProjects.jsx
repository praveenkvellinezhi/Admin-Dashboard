export default function OngoingProjects({ projects = {} }) {
  return (
    <div className="bg-white shadow-lg rounded-lg">
      <h3 className="px-4 py-3 border-b font-semibold text-sm">
        Ongoing Projects
      </h3>

      <div className="p-4 space-y-3 text-sm">
        <ProjectRow label="Completed" count={projects.completed} />
        <ProjectRow label="Assigned" count={projects.assigned} />
        <ProjectRow label="Pending" count={projects.pending} />
      </div>
    </div>
  );
}

const ProjectRow = ({ label, count = 0 }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <span className="text-gray-600">{label}</span>
      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
        {count}
      </span>
    </div>

    <button className="text-xs border px-2 py-1 rounded hover:bg-gray-50">
      View Details
    </button>
  </div>
);
