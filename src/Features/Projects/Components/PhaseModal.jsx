import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTaskModal from "./AddTaskmodal";

import {
  fetchEmployees,
} from "../../../Redux/Slices/employeeslice";

import {
  fetchTasks,
  selectProjectPhases,
} from "../../../Redux/Slices/projectSlice";

export default function PhaseDetailsModal({ phase, onClose }) {
  const dispatch = useDispatch();
  const [showAddTask, setShowAddTask] = useState(false);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTasks());
  }, [dispatch]);

  const phases = useSelector(selectProjectPhases);

  /* =========================
     CURRENT PHASE & TASKS
  ========================= */
  const currentPhase = phases.find((p) => p.id === phase.id);
  const tasks = currentPhase?.tasks || [];

  /* =========================
     PROGRESS CALCULATION
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
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {capitalize(currentPhase?.phase_type)}
            </h3>
            <button
              onClick={onClose}
              className="text-xs border px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
            >
              Back
            </button>
          </div>

          {/* Phase Description */}
          <p className="text-sm text-gray-500 mb-4">
            {currentPhase?.description || "No description available"}
          </p>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-700">
                {progress}%
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-blue-600 h-2 rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {progress === 0
                ? "Not started"
                : progress === 100
                ? "Completed"
                : "In progress"}
            </p>
          </div>

          {/* Tasks */}
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-500">
                No tasks added yet.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4"
                >
                  {/* TITLE */}
                  <h4 className="font-semibold text-gray-800">
                    {task.title}
                  </h4>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description || "No description"}
                  </p>

                  {/* DATES */}
                  <div className="flex gap-6 mt-3 text-xs text-gray-500">
                    <span>
                      <span className="font-medium text-gray-700">
                        Start:
                      </span>{" "}
                      {task.start_date || "-"}
                    </span>

                    <span>
                      <span className="font-medium text-gray-700">
                        End:
                      </span>{" "}
                      {task.end_date || "-"}
                    </span>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
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
          <div className="mt-6 flex justify-end">
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
