import React from "react";
import { X, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  addPhase,
  
  getPhaseAddStatus,
  getPhaseError,
  selectAllPhases,
} from "../../../Redux/Slices/phaseSlice";

import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

import {
  fetchProjectById,
  selectSelectedProject,
} from "../../../Redux/Slices/projectSlice";

export default function AddPhaseModal({ onClose }) {
  const dispatch = useDispatch();
  const { id } = useParams(); // project_id

  const employees = useSelector(selectAllEmployees) || [];
  const phases = useSelector(selectAllPhases) || [];
  const project = useSelector(selectSelectedProject);

  const addStatus = useSelector(getPhaseAddStatus);
  const error = useSelector(getPhaseError);

  const projectTeam = project?.team_members || [];

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [localError, setLocalError] = useState("");

  const [formData, setFormData] = useState({
    project_id: id,
    phase_type: "",
    description: "",
    start_date: "",
    end_date: "",
    employee_ids: [],
  });

  /* =========================
     FETCH REQUIRED DATA
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());        // for fallback / safety
    dispatch(fetchProjectById(id));    // 🔥 REQUIRED for team_members
  }, [dispatch, id]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError("");
  };

  const toggleAssign = (employee_id) => {
    setFormData((prev) => ({
      ...prev,
      employee_ids: prev.employee_ids.includes(employee_id)
        ? prev.employee_ids.filter((x) => x !== employee_id)
        : [...prev.employee_ids, employee_id],
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    // Phase required
    if (!formData.phase_type) {
      setLocalError("Phase type is required");
      return;
    }

    // Unique phase check
    const exists = phases.some(
      (p) =>
        String(p.project_id) === String(id) &&
        p.phase_type === formData.phase_type
    );

    if (exists) {
      setLocalError(
        `${formData.phase_type} phase already exists for this project`
      );
      return;
    }

    // Employees must belong to project team
    const invalidEmployees = formData.employee_ids.filter(
      (empId) =>
        !projectTeam.some(
          (tm) => tm.employee_id === empId
        )
    );

    if (invalidEmployees.length > 0) {
      setLocalError(
        "Selected employees must belong to the project team"
      );
      return;
    }

    const result = await dispatch(addPhase(formData));

    if (addPhase.fulfilled.match(result)) {
      dispatch(fetchProjectById(id));
      toast.success("Phase added successfully");
      // refresh phases
      onClose();
    }
  };

  /* =========================
     EMPLOYEE SOURCE (IMPORTANT)
  ========================= */
  const employeeSource =
    projectTeam.length > 0 ? projectTeam : employees;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Project Phase</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {(localError || error?.non_field_errors) && (
            <p className="text-xs text-red-600">
              {localError || error.non_field_errors[0]}
            </p>
          )}

          {/* PHASE TYPE */}
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
              {["planning", "design", "development", "testing", "deployment"].map(
                (type) => (
                  <option
                    key={type}
                    value={type}
                    disabled={phases.some(
                      (p) =>
                        String(p.project_id) === String(id) &&
                        p.phase_type === type
                    )}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                )
              )}
            </select>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Phase description"
          />

          {/* DATES */}
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
              className="w-full flex justify-between items-center border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <span className="truncate">
                {formData.employee_ids.length === 0
                  ? "Select employees"
                  : employeeSource
                      .filter((e) =>
                        formData.employee_ids.includes(e.employee_id)
                      )
                      .map((e) => e.name)
                      .join(", ")}
              </span>
              <ChevronDown size={16} />
            </button>

            {isAssignOpen && (
              <div className="absolute z-20 mt-1 w-full max-h-40 overflow-y-auto border rounded-lg bg-white shadow-md">
                {employeeSource.map((emp) => (
                  <label
                    key={emp.employee_id}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.employee_ids.includes(emp.employee_id)}
                      onChange={() => toggleAssign(emp.employee_id)}
                    />
                    {emp.name}
                    <span className="text-xs text-gray-400">
                      ({emp.department})
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
            disabled={addStatus === "loading"}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-60"
          >
            {addStatus === "loading" ? "Saving..." : "Add Phase"}
          </button>
        </div>
      </div>
    </div>
  );
}
