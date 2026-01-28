import React from "react";
import { Briefcase } from "lucide-react";
import { useEffect } from "react";
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

  


  useEffect(() => {
    if (managerStatus === "idle") {
      dispatch(fetchManagers());
    }
  }, [dispatch, managerStatus]);

 
  const handleManagerToggle = (e) => {
    const checked = e.target.checked;

    onChange({
      target: {
        name: "is_manager",
        value: checked,
        type: "checkbox",
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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 border-b bg-gray-50 rounded-t-lg">
        <Briefcase size={16} className="text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-700">
          Job & Role Information
        </h3>
      </div>

            <div className="p-4 space-y-4">
                <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Department
          </label>
          <select
            name="department"
            value={formData.department || ""}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Select Department</option>
            <option value="python">Python</option>
            <option value="mern">MERN Stack</option>
            <option value="uiux">UI/UX</option>
            <option value="hr">HR</option>
            <option value="flutter">Flutter</option>
          </select>
        </div>

                <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={onChange}
            placeholder="UI/UX Designer"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

                <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Position
          </label>
          <select
            name="position"
            value={formData.position || ""}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Select Position</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="manager">Manager</option>
          </select>
        </div>

                <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_manager"
            checked={!!formData.is_manager}
            onChange={handleManagerToggle}
            className="w-4 h-4"
          />
          <label htmlFor="is_manager" className="text-sm text-gray-700">
            Is Manager
          </label>
        </div>

                {!formData.is_manager && (
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Reporting Manager
            </label>
            <select
              name="reporting_manager"
              value={formData.reporting_manager || ""}
              onChange={onChange}
              disabled={managerStatus === "loading"}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">
                {managerStatus === "loading"
                  ? "Loading managers..."
                  : "Select Manager"}
              </option>

              {managers.map((manager) => (
                <option key={manager.employee_id} value={manager.employee_id}>
                  {manager.name} 
                </option>
              ))}
            </select>
          </div>
        )}

                <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Date of Joining
          </label>
          <input
            type="date"
            name="joining_date"
            value={formData.joining_date || ""}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
