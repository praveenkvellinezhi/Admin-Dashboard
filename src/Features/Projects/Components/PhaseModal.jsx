import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../../../Redux/Slices/projectSlice";
import { useParams } from "react-router";

import {
  addTask,
  editTask,
  deleteTask,
  fetchTasksByPhase,
  selectAllTasks,
} from "../../../Redux/Slices/taskSlice";

import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

export default function PhaseDetailsModal({ phase, onClose }) {
  const dispatch = useDispatch();
  const {id} =useParams();

  const employees = useSelector(selectAllEmployees);
  const tasks = useSelector(selectAllTasks);

  
  const phaseId = phase?.phase_id;

  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "in_progress",
    start_date: "",
    end_date: "",
    assigned_to: "",
  });


  useEffect(() => {
    if (!phaseId) return;
    dispatch(fetchEmployees());
    dispatch(fetchTasksByPhase(phaseId));
  }, [dispatch, phaseId]);


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
  await dispatch(editTask({ taskId: editingTaskId, payload }));
} else {
  await dispatch(addTask(payload));
}

await dispatch(fetchProjectById(id)); // 🔥 REQUIRED
await dispatch(fetchTasksByPhase(phaseId));         // modal sync


     dispatch(fetchTasksByPhase(phaseId));

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
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    await dispatch(deleteTask(taskId));


    dispatch(fetchTasksByPhase(phaseId));
   

   
    
  };

  

  /* =========================
     UI
  ========================= */
  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation(  )}
                >

          {/* HEADER */}
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold capitalize">
              {phase.phase_type} Tasks
            </h3>
            <button
              onClick={onClose}
              className="text-xs border px-3 py-1 rounded"
            >
              Back
            </button>
          </div>

          {/* TABLE HEADER */}
          <div className="grid grid-cols-12 text-xs font-semibold text-gray-500 border-b pb-2">
            <div className="col-span-3">Designer</div>
            <div className="col-span-3">Task</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Dates</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* TASK ROWS */}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-12 items-center py-3 text-sm border-b hover:bg-gray-50"
            >
              {/* DESIGNER */}
              <div className="col-span-3 flex items-center gap-2">
                {task.assigned_to?.[0] ? (
                  <>
                    <img
                      src={task.assigned_to[0].profile_image_url}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span>{task.assigned_to[0].name}</span>
                  </>
                ) : (
                  <span className="text-gray-400">Unassigned</span>
                )}
              </div>

              {/* TASK */}
              <div className="col-span-3 truncate">
                {task.title}
              </div>

              {/* STATUS */}
              <div className="col-span-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {task.status.replace("_", " ")}
                </span>
              </div>

              {/* DATES */}
              <div className="col-span-2 text-xs text-gray-500">
                {task.start_date} → {task.end_date}
              </div>

              {/* ACTIONS */}
              <div className="col-span-2 flex justify-end gap-2">
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
                  className="text-xs border px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.task_id)}
                  className="text-xs border px-2 py-1 rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* ADD / EDIT FORM */}
          <div className="mt-5">
            {!showAddTask ? (
              <button
                onClick={() => setShowAddTask(true)}
                className="text-xs border px-3 py-1 text-blue-600 rounded"
              >
                Add Task
              </button>
            ) : (
              <div className="border rounded-lg p-4 mt-3 bg-gray-50 space-y-3">
                <h4 className="text-sm font-semibold">
                  {editingTaskId ? "Edit Task" : "Add Task"}
                </h4>

                <input
                  placeholder="Title"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2"
                />

                <textarea
                  placeholder="Description"
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2"
                />

                {/* STATUS INPUT */}
                <select
                  value={taskForm.status}
                  onChange={(e) =>
                    setTaskForm((p) => ({ ...p, status: e.target.value }))
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={taskForm.start_date}
                    onChange={(e) =>
                      setTaskForm((p) => ({
                        ...p,
                        start_date: e.target.value,
                      }))
                    }
                    className="border rounded px-3 py-2"
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
                    className="border rounded px-3 py-2"
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
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Assign employee</option>
                  {employees.map((emp) => (
                    <option key={emp.employee_id} value={emp.employee_id}>
                      {emp.name}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowAddTask(false);
                      setEditingTaskId(null);
                    }}
                    className="text-xs border px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTask}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    {editingTaskId ? "Update Task" : "Save Task"}
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
