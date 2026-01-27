import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllPhases,
  editPhase,
  deletePhase,
} from "../../../Redux/Slices/phaseSlice";

import {
  addTask,
  editTask,
  deleteTask,
  fetchTasksByPhase,
} from "../../../Redux/Slices/taskSlice";

import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

export default function PhaseDetailsModal({ phase, onClose }) {
  const dispatch = useDispatch();

  /* =========================
     REDUX STATE
  ========================= */
  const phases = useSelector(selectAllPhases);
  const employees = useSelector(selectAllEmployees);

  const currentPhase = phases.find(
    (p) => Number(p.id) === Number(phase.id)
  );

  if (!currentPhase) return null;

  const tasks = currentPhase.tasks || [];

  /* =========================
     LOCAL STATE
  ========================= */
  const [editingPhase, setEditingPhase] = useState(false);
  const [editPhaseData, setEditPhaseData] = useState({
    phase_type: "",
    description: "",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
    status: "in_progress",
    start_date: "",
    end_date: "",
    assigned_to: "",
  });

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
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
    dispatch(fetchEmployees());
    dispatch(fetchTasksByPhase(phase.id));
  }, [dispatch, phase.id]);

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
     PHASE HANDLERS
  ========================= */
  const startPhaseEdit = () => {
    setEditingPhase(true);
    setEditPhaseData({
      phase_type: currentPhase.phase_type,
      description: currentPhase.description || "",
    });
  };

  const savePhaseEdit = async () => {
    const result = await dispatch(
      editPhase({
        phaseId: currentPhase.id,
        payload: editPhaseData,
      })
    );

    if (editPhase.fulfilled.match(result)) {
      setEditingPhase(false);
    }
  };

  const handleDeletePhase = () => {
    if (window.confirm("Delete this phase?")) {
      dispatch(deletePhase(currentPhase.id));
      onClose();
    }
  };

  /* =========================
     TASK HANDLERS
  ========================= */
  const startTaskEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTaskData({
      title: task.title,
      description: task.description || "",
      status: task.status,
      start_date: task.start_date || "",
      end_date: task.end_date || "",
      assigned_to: task.assigned_to || "",
    });
  };

  const saveTaskEdit = async () => {
    const result = await dispatch(
      editTask({
        taskId: editingTaskId,
        payload: {
          ...editTaskData,
          assigned_to: editTaskData.assigned_to || null,
        },
      })
    );

    if (editTask.fulfilled.match(result)) {
      setEditingTaskId(null);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  /* =========================
     ADD TASK HANDLERS
  ========================= */
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    if (
      newTask.start_date &&
      newTask.end_date &&
      newTask.start_date > newTask.end_date
    ) {
      alert("End date must be after start date");
      return;
    }

    const result = await dispatch(
      addTask({
        ...newTask,
        phase: currentPhase.id,
        assigned_to: newTask.assigned_to || null,
      })
    );

    if (addTask.fulfilled.match(result)) {
      setNewTask({
        title: "",
        description: "",
        status: "in_progress",
        start_date: "",
        end_date: "",
        assigned_to: "",
      });
      setShowAddTask(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            {editingPhase ? (
              <input
                className="border px-2 py-1 rounded w-1/2"
                value={editPhaseData.phase_type}
                onChange={(e) =>
                  setEditPhaseData({
                    ...editPhaseData,
                    phase_type: e.target.value,
                  })
                }
              />
            ) : (
              <h3 className="text-lg font-semibold">
                {capitalize(currentPhase.phase_type)}
              </h3>
            )}

            <div className="flex gap-2">
              {editingPhase ? (
                <button
                  onClick={savePhaseEdit}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={startPhaseEdit}
                  className="text-xs border px-3 py-1 rounded"
                >
                  Edit Phase
                </button>
              )}

              <button
                onClick={handleDeletePhase}
                className="text-xs border px-3 py-1 text-red-600 rounded"
              >
                Delete Phase
              </button>

              <button
                onClick={onClose}
                className="text-xs border px-3 py-1 rounded"
              >
                Back
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          {editingPhase ? (
            <textarea
              className="border rounded w-full px-2 py-1 mb-4"
              rows={2}
              value={editPhaseData.description}
              onChange={(e) =>
                setEditPhaseData({
                  ...editPhaseData,
                  description: e.target.value,
                })
              }
            />
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              {currentPhase.description || "No description"}
            </p>
          )}

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

          {/* TASK LIST */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                {editingTaskId === task.id ? (
                  <>
                    <input
                      className="border rounded px-2 py-1 w-full mb-2"
                      value={editTaskData.title}
                      onChange={(e) =>
                        setEditTaskData({
                          ...editTaskData,
                          title: e.target.value,
                        })
                      }
                    />

                    <textarea
                      className="border rounded px-2 py-1 w-full mb-2"
                      rows={2}
                      value={editTaskData.description}
                      onChange={(e) =>
                        setEditTaskData({
                          ...editTaskData,
                          description: e.target.value,
                        })
                      }
                    />

                    <select
                      className="border rounded px-2 py-1 mb-2"
                      value={editTaskData.status}
                      onChange={(e) =>
                        setEditTaskData({
                          ...editTaskData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="date"
                        value={editTaskData.start_date}
                        onChange={(e) =>
                          setEditTaskData({
                            ...editTaskData,
                            start_date: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                      <input
                        type="date"
                        value={editTaskData.end_date}
                        onChange={(e) =>
                          setEditTaskData({
                            ...editTaskData,
                            end_date: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                    </div>

                    <select
                      className="border rounded px-2 py-1 mb-2 w-full"
                      value={editTaskData.assigned_to}
                      onChange={(e) =>
                        setEditTaskData({
                          ...editTaskData,
                          assigned_to: e.target.value
                            ? Number(e.target.value)
                            : "",
                        })
                      }
                    >
                      <option value="">Assign employee</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>

                    <div className="flex gap-2">
                      <button
                        onClick={saveTaskEdit}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="text-xs border px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {task.start_date || "-"} → {task.end_date || "-"}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs">{task.status}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startTaskEdit(task)}
                          className="text-xs border px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-xs border px-2 py-1 text-red-600 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ADD TASK INLINE */}
          <div className="mt-6">
            {!showAddTask ? (
              <button
                onClick={() => setShowAddTask(true)}
                className="text-xs border px-3 py-1 text-blue-600 rounded"
              >
                Add Task
              </button>
            ) : (
              <div className="border rounded-lg p-4 mt-4 bg-gray-50 space-y-3">
                <input
                  name="title"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={handleNewTaskChange}
                  className="w-full border rounded px-3 py-2"
                />

                <textarea
                  name="description"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={handleNewTaskChange}
                  rows={2}
                  className="w-full border rounded px-3 py-2"
                />

                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleNewTaskChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    name="start_date"
                    value={newTask.start_date}
                    onChange={handleNewTaskChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="date"
                    name="end_date"
                    value={newTask.end_date}
                    onChange={handleNewTaskChange}
                    className="border rounded px-3 py-2"
                  />
                </div>

                <select
                  name="assigned_to"
                  value={newTask.assigned_to}
                  onChange={(e) =>
                    setNewTask((p) => ({
                      ...p,
                      assigned_to: e.target.value
                        ? Number(e.target.value)
                        : "",
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Assign employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="text-xs border px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Save Task
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================
   HELPER
========================= */
function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
