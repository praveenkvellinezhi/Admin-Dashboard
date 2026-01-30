import React, { useEffect, useState } from "react";
import { X, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  addTask,
  editTask,
  deleteTask,
  fetchTasksByPhase,
  selectAllTasks,
  getTaskStatus,
} from "../../../Redux/Slices/taskSlice";

import {
  fetchEmployees,
  selectAllEmployees,
  getEmployeeStatus,
} from "../../../Redux/Slices/employeeslice";

import {
  fetchProjectById,
  selectSelectedProject,
  getSingleProjectStatus,
} from "../../../Redux/Slices/projectSlice";

import DeleteModal from "../../../Components/Shared/DeleteModal";

export default function PhaseDetailsModal({ phase, onClose }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const project = useSelector(selectSelectedProject);
  const employees = useSelector(selectAllEmployees);
  const tasks = useSelector(selectAllTasks);

  const taskStatus = useSelector(getTaskStatus);
  const employeeStatus = useSelector(getEmployeeStatus);
  const projectStatus = useSelector(getSingleProjectStatus);

  const phaseId = phase?.phase_id;

  const isLoading =
    taskStatus === "loading" ||
    employeeStatus === "loading" ||
    projectStatus === "loading";

  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "in_progress",
    start_date: "",
    end_date: "",
    assigned_to: "",
  });

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    if (!phaseId) return;

    dispatch(fetchEmployees());
    dispatch(fetchProjectById(id));
    dispatch(fetchTasksByPhase(phaseId));
  }, [dispatch, phaseId, id]);

  /* =========================
     SAVE TASK
  ========================= */
  const handleSaveTask = async () => {
    if (!taskForm.title.trim()) return;

    const payload = {
      title: taskForm.title,
      description: taskForm.description,
      status: taskForm.status,
      start_date: taskForm.start_date,
      end_date: taskForm.end_date,
      phase_id: phaseId,
      employee_ids: taskForm.assigned_to
        ? [taskForm.assigned_to]
        : [],
    };

    if (editingTaskId) {
      await dispatch(
        editTask({ taskId: editingTaskId, payload })
      );
    } else {
      await dispatch(addTask(payload));
    }

    await dispatch(fetchProjectById(id));
    await dispatch(fetchTasksByPhase(phaseId));

    setTaskForm({
      title: "",
      description: "",
      status: "in_progress",
      start_date: "",
      end_date: "",
      assigned_to: "",
    });

    setEditingTaskId(null);
    setShowAddTask(false);
  };

  /* =========================
     DELETE TASK
  ========================= */
  const handleConfirmDelete = async () => {
    await dispatch(deleteTask(deleteTaskId));
    await dispatch(fetchTasksByPhase(phaseId));
    setShowDelete(false);
    setDeleteTaskId(null);
  };

  /* =========================
     HELPERS
  ========================= */
  const projectEmployees =
    project?.team_members?.map((m) => m.employee_id) || [];

  const assignedEmployees = employees.filter((emp) =>
    projectEmployees.includes(emp.employee_id)
  );

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  /* =========================
     LOADER
  ========================= */
  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-40" />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl px-10 py-8 shadow-lg flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
            <p className="text-sm text-gray-600">
              Loading phase details...
            </p>
          </div>
        </div>
      </>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start px-6 py-5 border-b">
            <div>
              <h2 className="text-lg font-semibold capitalize">
                {phase.phase_type}
              </h2>
              <p className="text-sm text-gray-500">
                {capitalize(phase.description)}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* TABLE HEADER */}
            <div className="grid grid-cols-12 text-sm text-gray-500 border-b pb-3">
              <div className="col-span-3">Assignee</div>
              <div className="col-span-3">Task</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Dates</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* TASK LIST */}
            <div className="space-y-2 mt-3">
              {tasks.map((task) => (
                <div
                  key={task.task_id}
                  className="grid grid-cols-12 items-center px-4 py-3 bg-white border border-gray-300 rounded-xl hover:shadow-sm"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    {task.assigned_to?.[0] ? (
                      <>
                        <img
                          src={task.assigned_to[0].profile_image_url}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-medium">
                          {task.assigned_to[0].name}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">
                        Unassigned
                      </span>
                    )}
                  </div>

                  <div className="col-span-3 font-medium truncate">
                    {capitalize(task.title)}
                  </div>

                  <div className="col-span-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="col-span-2 text-sm text-gray-500">
                    {task.start_date || "--"} →{" "}
                    {task.end_date || "--"}
                  </div>

                  <div className="col-span-2 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditingTaskId(task.task_id);
                        setShowAddTask(true);
                        setTaskForm({
                          title: task.title,
                          description: task.description || "",
                          status: task.status,
                          start_date: task.start_date,
                          end_date: task.end_date,
                          assigned_to:
                            task.assigned_to?.[0]?.employee_id || "",
                        });
                      }}
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteTaskId(task.task_id);
                        setShowDelete(true);
                      }}
                      className="p-2 rounded hover:bg-red-50 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!showAddTask && (
              <button
                onClick={() => setShowAddTask(true)}
                className="mt-4 text-sm text-blue-600 font-medium"
              >
                + Add Task
              </button>
            )}

            {/* ADD / EDIT FORM */}
            {showAddTask && (
              <div className="border border-gray-300 rounded-2xl p-6 bg-white mt-6">
                <h3 className="text-lg font-semibold mb-5">
                  {editingTaskId ? "Edit Task" : "Add Task"}
                </h3>

                {/* FORM */}
                {/* (exactly same as you had – working) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm((p) => ({
                        ...p,
                        title: e.target.value,
                      }))
                    }
                    className="md:col-span-2 border border-gray-300 rounded-xl px-4 py-3 text-sm"
                  />

                  <select
                    value={taskForm.status}
                    onChange={(e) =>
                      setTaskForm((p) => ({
                        ...p,
                        status: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <textarea
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="date"
                    value={taskForm.start_date}
                    onChange={(e) =>
                      setTaskForm((p) => ({
                        ...p,
                        start_date: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm"
                  />
                  <input
                    type="date"
                    value={taskForm.end_date}
                    onChange={(e) =>
                      setTaskForm((p) => ({
                        ...p,
                        end_date: e.target.value,
                      }))
                    }
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <select
                  value={taskForm.assigned_to}
                  onChange={(e) =>
                    setTaskForm((p) => ({
                      ...p,
                      assigned_to: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mb-6"
                >
                  <option value="">Assign employee</option>
                  {assignedEmployees.map((emp) => (
                    <option
                      key={emp.employee_id}
                      value={emp.employee_id}
                    >
                      {emp.name}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setShowAddTask(false);
                      setEditingTaskId(null);
                    }}
                    className="text-sm text-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveTask}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-medium"
                  >
                    {editingTaskId ? "Update Task" : "Save Task"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task?"
      />
    </>
  );
}
