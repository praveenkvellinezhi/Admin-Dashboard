import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  addTask,
  fetchTasksByPhase,
  getTaskAddStatus,
} from "../../../Redux/Slices/taskSlice";

import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

export default function AddTaskModal({ phaseId, onClose }) {
  const dispatch = useDispatch();

  const employees = useSelector(selectAllEmployees);
  const status = useSelector(getTaskAddStatus);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "in_progress",
    start_date: "",
    end_date: "",
    assigned_to: "",
  });

  /* FETCH EMPLOYEES */
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]:
        name === "assigned_to" && value ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      phase: phaseId, // ✅ important
      assigned_to: formData.assigned_to || null,
    };

   const result = await dispatch(addTask(payload));

if (addTask.fulfilled.match(result)) {
  onClose(); // close modal only
}

  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Task</h2>
          <button type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input type="date" name="start_date" onChange={handleChange} />
            <input type="date" name="end_date" onChange={handleChange} />
          </div>

          <select
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Assign employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="button"            
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {status === "loading" ? "Saving..." : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
