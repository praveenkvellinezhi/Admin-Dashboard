import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

/* =========================
   REDUX IMPORTS
========================= */
import {
  fetchManagers,
  fetchEmployees,
  selectAllEmployees,
  selectAllManagers,
} from "../../../Redux/Slices/employeeslice";

import {
  addProject,
  getAddProjectStatus,
} from "../../../Redux/Slices/projectSlice";

/* =========================
   COMPONENT
========================= */
export default function ProjectAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const managers = useSelector(selectAllManagers);
  const employees = useSelector(selectAllEmployees) || [];
  const addStatus = useSelector(getAddProjectStatus);

  const [isTeamOpen, setIsTeamOpen] = useState(false);

  /* =========================
     FETCH EMPLOYEES
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
    project_manager_id: "",
    team_members: [],
    total_budget: "",
    project_logo: null,
  });

  /* =========================
     INPUT HANDLER
  ========================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "client_contact") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 10) return;
      setFormData((prev) => ({ ...prev, client_contact: digitsOnly }));
      return;
    }

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     TEAM MEMBER TOGGLE
  ========================= */
  const toggleTeamMember = (employee_id) => {
    setFormData((prev) => ({
      ...prev,
      team_members: prev.team_members.includes(employee_id)
        ? prev.team_members.filter((id) => id !== employee_id)
        : [...prev.team_members, employee_id],
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "" && value !== undefined) {
        if (key === "team_members") {
          value.forEach((id) => data.append("team_member_ids", id));
        } else {
          data.append(key, value);
        }
      }
    });

    const result = await dispatch(addProject(data));

    if (addProject.fulfilled.match(result)) {
      toast.success("Project added successfully");
      navigate("/projects");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 px-6">
      {/* HEADER */}
      <div className="-mx-6 px-6 py-4 flex items-center bg-white justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Add New Project
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Projects &gt; Add Project
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={addStatus === "loading"}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium
                     hover:bg-blue-700 disabled:opacity-60"
        >
          {addStatus === "loading" ? "Saving..." : "Save Project"}
        </button>
      </div>

      {/* ✅ SINGLE WHITE CONTAINER */}
      <div className="bg-white  shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            <Section title="Project Details">
              <Input label="Project Name" name="project_name" value={formData.project_name} onChange={handleChange} />

              <Select
                label="Project Type"
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                options={[
                  { value: "web", label: "Web" },
                  { value: "app", label: "Mobile App" },
                  { value: "webapp", label: "Web App" },
                  { value: "software", label: "Software" },
                ]}
              />

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

              <Input label="Client Name" name="client_name" value={formData.client_name} onChange={handleChange} />
              <Input label="Client Email" type="email" name="client_email" value={formData.client_email} onChange={handleChange} />
              <Input label="Client Contact Number" name="client_contact" value={formData.client_contact} onChange={handleChange} />

              <Textarea label="Project Description" name="description" value={formData.description} onChange={handleChange} />
            </Section>

            <Section title="Timeline">
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" label="Start Date" name="start_date" value={formData.start_date} onChange={handleChange} />
                <Input type="date" label="End Date" name="end_date" value={formData.end_date} onChange={handleChange} />
              </div>
            </Section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Section title="Team & Responsibility">
              <Select
                label="Project Manager"
                name="project_manager_id"
                value={formData.project_manager_id}
                onChange={handleChange}
                options={employees.map((emp) => ({
                  value: emp.employee_id,
                  label: emp.name,
                }))}
              />

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Members
                </label>

                <button
                  type="button"
                  onClick={() => setIsTeamOpen((p) => !p)}
                  className="w-full flex justify-between items-center rounded-lg border px-3 py-2 text-sm bg-white"
                >
                  <span className="truncate">
                    {formData.team_members.length === 0
                      ? "Select team members"
                      : employees
                          .filter((e) => formData.team_members.includes(e.employee_id))
                          .map((e) => e.name)
                          .join(", ")}
                  </span>
                  <span className="text-gray-400">▾</span>
                </button>

                {isTeamOpen && (
                  <div className="absolute z-20 mt-2 w-full max-h-56 overflow-auto rounded-lg border bg-white shadow-lg">
                    {employees.map((emp) => (
                      <label
                        key={emp.employee_id}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.team_members.includes(emp.employee_id)}
                          onChange={() => toggleTeamMember(emp.employee_id)}
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
            </Section>

            <Section title="Budget & Logo">
              <Input label="Total Budget" name="total_budget" value={formData.total_budget} onChange={handleChange} />
              <input
                type="file"
                name="project_logo"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   UI HELPERS
========================= */
const Section = ({ title, children }) => (
  <div className="border-b last:border-b-0 pb-6">
    <h3 className="text-sm font-semibold text-gray-800 mb-4">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      {...props}
      rows={3}
      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
    />
  </div>
);

const Select = ({ label, options = [], ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      {...props}
      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-500"
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
