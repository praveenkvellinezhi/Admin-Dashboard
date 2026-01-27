import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";

import AddTaskModal from "./AddTaskmodal";
import EditTaskModal from "./EditTaskModal";

import { fetchEmployees } from "../../../Redux/Slices/employeeslice";
import {
  fetchTasksByPhase,
  selectAllTasks,
  deleteTask,
} from "../../../Redux/Slices/taskSlice";

export default function PhaseDetailsModal({ phase, onClose }) {
  const dispatch = useDispatch();

  const [showAddTask, setShowAddTask] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const tasks = useSelector(selectAllTasks);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    if (phase?.id) {
      dispatch(fetchEmployees());
      dispatch(fetchTasksByPhase(phase.id));
    }
  }, [dispatch, phase?.id]);

  /* =========================
     DELETE TASK
  ========================= */
  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    dispatch(deleteTask(taskId));
  };

  /* =========================
     PROGRESS
  ========================= */
  const completedTasks = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  /* =========================
     UI
  ========================= */
  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {capitalize(phase.phase_type)}
            </h3>
            <button
              onClick={onClose}
              className="text-xs border px-3 py-1 rounded"
            >
              Back
            </button>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 mb-4">
            {phase.description || "No description"}
          </p>

          {/* PROGRESS */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TASKS */}
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-400">No tasks added yet</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4 relative"
                >
                  {/* ACTIONS */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => setEditTask(task)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h4 className="font-semibold">{task.title}</h4>

                  <p className="text-sm text-gray-600 mt-1">
                    {task.description || "No description"}
                  </p>

                  <div className="flex gap-6 text-xs text-gray-500 mt-2">
                    <span>Start: {task.start_date || "-"}</span>
                    <span>End: {task.end_date || "-"}</span>
                  </div>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
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

          {/* FOOTER */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowAddTask(true)}
              className="text-xs text-blue-600 border px-3 py-1 rounded"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* ADD TASK */}
      {showAddTask && (
        <AddTaskModal
          phaseId={phase.id}
          onClose={() => setShowAddTask(false)}
        />
      )}

      {/* EDIT TASK */}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
        />
      )}
    </>
  );
}

function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
