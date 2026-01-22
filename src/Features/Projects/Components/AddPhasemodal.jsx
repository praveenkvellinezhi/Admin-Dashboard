import { X, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  addPhase,
  getPhaseAddStatus,
} from "../../../Redux/Slices/projectSlice";

import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

export default function AddPhaseModal({ onClose }) {
  const dispatch = useDispatch();
  const { id } = useParams(); // PRJ-2026-0027

  const employees = useSelector(selectAllEmployees);
  const status = useSelector(getPhaseAddStatus);

  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const [formData, setFormData] = useState({
    project_id: id,
    phase_type: "",
    description: "",
    start_date: "",
    end_date: "",
    employee_ids: [],
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, project_id: id }));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAssign = (employeeId) => {
    setFormData((prev) => ({
      ...prev,
      employee_ids: prev.employee_ids.includes(employeeId)
        ? prev.employee_ids.filter((x) => x !== employeeId)
        : [...prev.employee_ids, employeeId],
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
    };

    const result = await dispatch(addPhase(payload));
    if (addPhase.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      {/* MODAL */}
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-lg
                   max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10
                        flex justify-between items-center
                        px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Project Phase</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {/* Phase Type */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Phase Type
            </label>
            <select
              name="phase_type"
              value={formData.phase_type}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select phase</option>
              <option value="planning">Planning</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="deployment">Deployment</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Dates */}
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

          {/* ASSIGNED EMPLOYEES */}
          <div className="relative">
            <label className="text-xs font-medium text-gray-600">
              Assigned Employees
            </label>

            <button
              type="button"
              onClick={() => setIsAssignOpen((p) => !p)}
              className="w-full flex justify-between items-center
                         border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <span className="truncate">
                {formData.employee_ids.length === 0
                  ? "Select employees"
                  : employees
                      .filter((e) =>
                        formData.employee_ids.includes(e.employee_id)
                      )
                      .map((e) => e.name)
                      .join(", ")}
              </span>
              <ChevronDown size={16} />
            </button>

            {isAssignOpen && (
              <div className="absolute z-20 mt-1 w-full max-h-40 overflow-y-auto
                              border rounded-lg bg-white shadow-md">
                {employees.map((emp) => (
                  <label
                    key={emp.employee_id}
                    className="flex items-center gap-2 px-3 py-2 text-sm
                               hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.employee_ids.includes(emp.employee_id)}
                      onChange={() => toggleAssign(emp.employee_id)}
                    />
                    {emp.name}
                    <span className="text-xs text-gray-400">
                      ({emp.employee_id})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
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
            {status === "loading" ? "Saving..." : "Add Phase"}
          </button>
        </div>
      </div>
    </div>
  );
}
