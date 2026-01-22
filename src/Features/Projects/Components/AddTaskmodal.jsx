import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { addTask, getTaskAddStatus } from "../../../Redux/Slices/projectSlice";
import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

export default function AddTaskModal({ phaseId, onClose }) {
  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployees);
  const status = useSelector(getTaskAddStatus);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "in_progress",
    start_date: "",
    end_date: "",
    phase: phaseId,
    assigned_to: "",
  });

  /* =========================
     FETCH EMPLOYEES
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  /* =========================
     KEEP PHASE IN SYNC
  ========================= */
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      phase: phaseId,
    }));
  }, [phaseId]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "assigned_to" && value
          ? Number(value)   // ✅ FIX
          : value,
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      start_date: formData.start_date,
      end_date: formData.end_date,
      phase: formData.phase,
      assigned_to: formData.assigned_to || null,
    };

    console.log("TASK PAYLOAD 👉", payload); // 🔍 DEBUG

    const result = await dispatch(addTask(payload));
    if (addTask.fulfilled.match(result)) {
      onClose();
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Task</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <textarea
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <select
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Assign employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.department})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            {status === "loading" ? "Saving..." : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
