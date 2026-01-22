import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchEmployees,
  fetchManagers,
  selectAllEmployees,
  selectAllManagers,
} from "../../../Redux/Slices/employeeslice";

import {
  addProject,
  getAddProjectStatus,
} from "../../../Redux/Slices/projectSlice";

export default function ProjectAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector(selectAllEmployees);
  const managers = useSelector(selectAllManagers);
  const addStatus = useSelector(getAddProjectStatus);

  /* =========================
     LOCAL UI STATE
  ========================= */
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchManagers());
  }, [dispatch]);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    client_name: "",
    client_email: "",
    client_contact: "",
    start_date: "",
    end_date: "",
    priority: "",
    project_type: "",
    project_manager: "",
    team_members: [],
    total_budget: "",
    project_logo: null,
  });

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const toggleTeamMember = (id) => {
    setFormData((prev) => ({
      ...prev,
      team_members: prev.team_members.includes(id)
        ? prev.team_members.filter((x) => x !== id)
        : [...prev.team_members, id],
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else if (value !== "" && value !== null) {
        data.append(key, value);
      }
    });

    const result = await dispatch(addProject(data));
    if (addProject.fulfilled.match(result)) {
      navigate("/projects");
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Add New Project
        </h1>

        <button
          onClick={handleSubmit}
          disabled={addStatus === "loading"}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium
                     hover:bg-blue-700 disabled:opacity-60"
        >
          {addStatus === "loading" ? "Saving..." : "Save Project"}
        </button>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <Input label="Project Name" name="project_name" value={formData.project_name} onChange={handleChange} />
          <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
          <Input label="Client Name" name="client_name" value={formData.client_name} onChange={handleChange} />
          <Input label="Client Email" type="email" name="client_email" value={formData.client_email} onChange={handleChange} />
          <Input label="Client Contact" name="client_contact" value={formData.client_contact} onChange={handleChange} />

          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />

          <Select
            label="Project Type"
            name="project_type"
            value={formData.project_type}
            onChange={handleChange}
            options={[
              { value: "web", label: "Web" },
              { value: "app", label: "App" },
              { value: "webapp", label: "Web App" },
            ]}
          />

          <Input label="Total Budget" name="total_budget" value={formData.total_budget} onChange={handleChange} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <Input label="Start Date" type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
          <Input label="End Date" type="date" name="end_date" value={formData.end_date} onChange={handleChange} />

          <Select
            label="Project Manager"
            name="project_manager"
            value={formData.project_manager}
            onChange={handleChange}
            options={managers.map((m) => ({
              value: m.id,
              label: m.name,
            }))}
          />

          {/* TEAM MEMBERS DROPDOWN */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Team Members
            </label>

            <button
              type="button"
              onClick={() => setIsTeamOpen((prev) => !prev)}
              className="w-full flex justify-between items-center rounded-lg border border-gray-300
                         bg-white px-3 py-2 text-sm text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="truncate">
                {formData.team_members.length === 0
                  ? "Select team members"
                  : employees
                      .filter((e) =>
                        formData.team_members.includes(e.id)
                      )
                      .map((e) => e.name)
                      .join(", ")}
              </span>

              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isTeamOpen && (
              <div className="absolute z-20 mt-1 w-full max-h-56 overflow-auto
                              rounded-lg border border-gray-200 bg-white shadow-lg">
                {employees.map((emp) => (
                  <label
                    key={emp.id}
                    className="flex items-center gap-2 px-3 py-2 text-sm
                               hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.team_members.includes(emp.id)}
                      onChange={() => toggleTeamMember(emp.id)}
                      className="rounded border-gray-300"
                    />
                    <span>
                      {emp.name}
                      <span className="text-xs text-gray-400 ml-1">
                        ({emp.department})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* PROJECT LOGO */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Project Logo
            </label>
            <input
              type="file"
              name="project_logo"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   REUSABLE INPUTS
========================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {label}
    </label>
    <textarea
      {...props}
      rows={3}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {label}
    </label>
    <select
      {...props}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
