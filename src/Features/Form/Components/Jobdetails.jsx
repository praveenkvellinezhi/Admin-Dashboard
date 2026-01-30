import React, { useEffect } from "react";
import { Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchManagers,
  selectAllManagers,
  getManagerStatus,
} from "../../../Redux/Slices/employeeslice";

export default function JobRoleInformation({ formData, onChange }) {
  const dispatch = useDispatch();

  const managers = useSelector(selectAllManagers) || [];
  const managerStatus = useSelector(getManagerStatus);

  /* =========================
     FETCH MANAGERS
  ========================= */
  useEffect(() => {
    if (managerStatus === "idle") {
      dispatch(fetchManagers());
    }
  }, [dispatch, managerStatus]);

  /* =========================
     MANAGER TOGGLE
  ========================= */
  const handleManagerToggle = (e) => {
    const checked = e.target.checked;

    onChange({
      target: {
        name: "is_manager",
        value: checked,
        type: "checkbox",
        checked,
      },
    });

    if (checked) {
      onChange({
        target: {
          name: "reporting_manager",
          value: "",
        },
      });
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-300 rounded-t-xl">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <Briefcase size={16} className="text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Job & Role Information
        </h3>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-6 space-y-6">

        {/* DEPARTMENT */}
        <Field label="Department">
          <select
            name="department"
            value={formData.department || ""}
            onChange={onChange}
            
            className={inputClass}
          >
            <option value="">Select Department</option>
            <option value="python">Python</option>
            <option value="mern">MERN Stack</option>
            <option value="uiux">UI/UX</option>
            <option value="hr">HR</option>
            <option value="flutter">Flutter</option>
            <option value="software">Software Development</option>
            <option value="tester">Software Testing</option>
            <option value="data_analytics">Data Analytics</option>
            <option value="devops">DevOps</option>
            <option value="cybersecurity">Cyber Security</option>
            <option value="digital_marketing">Digital Marketing</option>
          </select>
        </Field>

        {/* ROLE */}
        <Field label="Role">
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={onChange}
            placeholder="e.g. UI/UX Designer"
            className={inputClass}
            required
          />
        </Field>

        {/* POSITION */}
        <Field label="Position">
          <select
            name="position"
            value={formData.position || ""}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Select Position</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="manager">Manager</option>
          </select>
        </Field>

        {/* IS MANAGER TOGGLE */}
        <div className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Is Manager</p>
            <p className="text-xs text-gray-500">
              Enable if this employee is a manager
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!formData.is_manager}
              onChange={handleManagerToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black transition-colors" />
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
          </label>
        </div>

        {/* REPORTING MANAGER */}
        {!formData.is_manager && (
          <Field label="Reporting Manager">
            <select
              name="reporting_manager"
              value={formData.reporting_manager || ""}
              onChange={onChange}
              disabled={managerStatus === "loading"}
              className={inputClass}
            >
              <option value="">
                {managerStatus === "loading"
                  ? "Loading managers..."
                  : "Select Reporting Manager"}
              </option>

              {managers.map((manager) => (
                <option
                  key={manager.employee_id}
                  value={manager.employee_id}
                >
                  {manager.name}
                </option>
              ))}
            </select>
          </Field>
        )}

        {/* DATE OF JOINING */}
        <Field label="Date of Joining">
          <input
            type="date"
            name="joining_date"
            value={formData.joining_date || ""}
            onChange={onChange}
            max={new Date().toISOString().split("T")[0]}
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
}

/* =========================
   FIELD WRAPPER
========================= */
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

/* =========================
   INPUT STYLE (VISIBLE BORDER)
========================= */
const inputClass =
  "w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-sm " +
  "focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10";
