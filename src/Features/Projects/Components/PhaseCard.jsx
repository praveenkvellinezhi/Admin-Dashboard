import React from "react";
import { Calendar, CheckCircle } from "lucide-react";

export default function PhaseCard({ phase, onClick }) {
  const capitalizeFirst = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const tasks = Array.isArray(phase?.tasks) ? phase.tasks : [];

  const employees =
    tasks
      .flatMap((task) => task?.assigned_to || [])
      .filter(
        (emp, index, self) =>
          emp &&
          index === self.findIndex((e) => e.employee_id === emp.employee_id)
      ) || [];

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="
        w-[280px]
        bg-white
        border border-gray-200
        rounded-2xl
        p-5
        cursor-pointer
        hover:shadow-md
        transition
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold text-gray-900 capitalize">
          {phase?.phase_type || "Phase"}
        </h3>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
          {tasks.length} tasks
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 mb-4">
        {capitalizeFirst(phase?.description || "No description")}
      </p>

      {/* DATE RANGE */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Calendar size={14} />
        <span>{phase?.start_date || "--"}</span>
        <span>→</span>
        <span>{phase?.end_date || "--"}</span>
      </div>

      {/* TASK LIST */}
      <div className="space-y-2 mb-5">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks added</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <CheckCircle
                size={20}
                className={
                  task.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-300"
                }
              />
              <span className="truncate">
                {capitalizeFirst(task.title)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-auto">
        {/* AVATARS */}
        <div className="flex -space-x-2 mb-4">
          {employees.length === 0 ? (
            <span className="text-sm text-gray-400">
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
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))
          )}
        </div>

        {/* PROGRESS */}
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">
            {progress}%
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
