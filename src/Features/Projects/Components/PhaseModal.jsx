import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTaskModal from "./AddTaskmodal";

import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

export default function PhaseDetailsModal({ phase, onClose }) {
  const dispatch = useDispatch();
  const [showAddTask, setShowAddTask] = useState(false);

  /* =========================
     FETCH EMPLOYEES
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const employees = useSelector(selectAllEmployees);

  /* =========================
     TASKS
  ========================= */
  const tasks = phase?.tasks || [];

  /* =========================
     PROGRESS
  ========================= */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  /* =========================
     EMPLOYEE MAP (API DATA)
  ========================= */
  const employeeMap = {};
  employees.forEach((emp) => {
    employeeMap[emp.id] = emp;
  });

  /* =========================
     ASSIGNED MEMBERS
     (PHASE + TASK LEVEL)
  ========================= */
  const assignedMembersMap = {};

  // Phase-level assignment
  if (Array.isArray(phase.assigned_to)) {
    phase.assigned_to.forEach((member) => {
      assignedMembersMap[member.id] =
        employeeMap[member.id] || member;
    });
  }

  // Task-level assignment
  tasks.forEach((task) => {
    if (task.assigned_to) {
      assignedMembersMap[task.assigned_to.id] =
        employeeMap[task.assigned_to.id] || task.assigned_to;
    }
  });

  const assignedMembers = Object.values(assignedMembersMap);

  /* =========================
     UI
  ========================= */
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {capitalize(phase.phase_type)}
            </h3>
            <button
              onClick={onClose}
              className="text-xs border px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
            >
              Back
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4">
            {phase.description || "No description available"}
          </p>

          {/* Meta */}
          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Start Date</p>
              <p className="font-medium">{phase.start_date}</p>
            </div>

            <div>
              <p className="text-gray-500">End Date</p>
              <p className="font-medium">{phase.end_date}</p>
            </div>

            <div>
              <p className="text-gray-500">Phase Status</p>
              <p className="font-medium text-blue-600">
                {progress === 0
                  ? "Not Started"
                  : progress === 100
                  ? "Completed"
                  : "In Progress"}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-blue-600 h-2 rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Assigned Members */}
          <div className="mb-5">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Assigned Members
            </p>

            {assignedMembers.length === 0 ? (
              <p className="text-xs text-gray-500">
                No members assigned yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {assignedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 border rounded-full px-3 py-1 text-xs"
                  >
                    {member.profile_image_url ? (
                      <img
                        src={member.profile_image_url}
                        alt={member.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-semibold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>{member.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-xs text-gray-500">
                No tasks added yet.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center border rounded p-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500">
                      {task.start_date} – {task.end_date}
                    </p>

                    {task.assigned_to && (
                      <div className="flex items-center gap-2 mt-1">
                        {(
                          employeeMap[task.assigned_to.id]
                            ?.profile_image_url ||
                          task.assigned_to.profile_image_url
                        ) ? (
                          <img
                            src={
                              employeeMap[task.assigned_to.id]
                                ?.profile_image_url ||
                              task.assigned_to.profile_image_url
                            }
                            className="w-5 h-5 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[9px]">
                            {task.assigned_to.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-xs text-gray-600">
                          {task.assigned_to.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in_progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-5 flex justify-end">
            <button
              onClick={() => setShowAddTask(true)}
              className="text-xs text-blue-600 border px-3 py-1 rounded hover:bg-blue-50"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTaskModal
          phaseId={phase.id}
          onClose={() => setShowAddTask(false)}
        />
      )}
    </>
  );
}

/* =========================
   HELPERS
========================= */
function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
