export default function ProjectMetrics({ project }) {
  const totalTasks = project?.total_tasks || 48;
  const completedTasks = project?.completed_tasks || 32;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 ">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Project Metrics
      </h3>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <MetricCard label="Total Task" value={totalTasks} />
        <MetricCard label="Completed Task" value={completedTasks} />
        <MetricCard label="Pending Task" value={pendingTasks} />
        <MetricCard label="Progress" value={`${project.progress || 66}%`} />
      </div>

      {/* Budget */}
      <div className="space-y-2 text-sm text-gray-700">
        <BudgetRow label="Budget Assigned" value={project.budget_assigned || 50000} />
        <BudgetRow label="Budget Used" value={project.budget_used || 35000} />
        <BudgetRow
          label="Remaining Budget"
          value={(project.budget_assigned || 50000) - (project.budget_used || 35000)}
        />
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function MetricCard({ label, value }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 text-center">
      <p className="text-lg font-semibold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function BudgetRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-medium">$ {value.toLocaleString()}</span>
    </div>
  );
}
