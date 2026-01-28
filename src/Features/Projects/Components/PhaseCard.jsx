import React from "react";

export default function PhaseCard({ phase, onClick }) {
  /* =========================
     SAFE TASK LIST
  ========================= */
  const tasks = Array.isArray(phase?.tasks) ? phase.tasks : [];

  /* =========================
     UNIQUE EMPLOYEES FROM TASKS
  ========================= */
  const employees =
    tasks
      .flatMap((task) => task?.assigned_to || [])
      .filter(
        (emp, index, self) =>
          emp &&
          index ===
            self.findIndex(
              (e) => e.employee_id === emp.employee_id
            )
      ) || [];


  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round((completedCount / tasks.length) * 100)
      : 0;

  
  return (
    <div
      onClick={onClick}
      className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between cursor-pointer hover:shadow-md transition"
    >
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-semibold text-gray-800 capitalize">
            {phase?.phase_type || "Phase"}
          </h3>
        </div>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {phase?.description || "No description"}
        </p>

        {/* DATES */}
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>{phase?.start_date || "--"}</span>
          <span>{phase?.end_date || "--"}</span>
        </div>

        {/* TASKS */}
        <div className="space-y-2 mb-4">
          {tasks.length === 0 ? (
            <p className="text-xs text-gray-400">
              No tasks added
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 text-xs text-gray-700"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : task.status === "in_progress"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                />
                <span className="truncate">
                  {task.title}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* EMPLOYEE AVATARS */}
      <div className="flex -space-x-2 mb-3">
        {employees.length === 0 ? (
          <span className="text-xs text-gray-400">
            No assignees
          </span>
        ) : (
          employees.map((emp) => (
            <img
              key={emp.employee_id}
              src={
                emp.profile_image_url ||
                `https://ui-avatars.com/api/?name=${emp.name}`
              }
              alt={emp.name}
              className="w-7 h-7 rounded-full border-2 border-white"
            />
          ))
        )}
      </div>

      {/* PROGRESS */}
      <div>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
