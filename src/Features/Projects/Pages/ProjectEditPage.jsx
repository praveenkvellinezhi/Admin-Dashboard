import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchEmployees,
  fetchManagers,
  selectAllEmployees,
  selectAllManagers,
} from "../../../Redux/Slices/employeeslice";

import {
  fetchProjectById,
  editProject,
  selectSelectedProject,
  getSingleProjectStatus,
  getEditProjectStatus,
} from "../../../Redux/Slices/projectSlice";

export default function ProjectEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const employees = useSelector(selectAllEmployees);
  const managers = useSelector(selectAllManagers);

  const project = useSelector(selectSelectedProject);
  const singleStatus = useSelector(getSingleProjectStatus);
  const editStatus = useSelector(getEditProjectStatus);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchManagers());
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    client_name: "",
    start_date: "",
    end_date: "",
    priority: "",
    project_type: "",

    // ✅ ONLY EDITABLE FIELDS
    project_manager_id: "",
    team_member_ids: [],
  });

  /* =========================
     PREFILL FORM
  ========================= */
  useEffect(() => {
    if (!project) return;

    setFormData({
      project_name: project.project_name || "",
      description: project.description || "",
      client_name: project.client_name || "",
      start_date: project.start_date || "",
      end_date: project.end_date || "",
      priority: project.priority || "",
      project_type: project.project_type || "",

      project_manager_id: project.project_manager || "",
      team_member_ids: project.team_members
        ? project.team_members.map((e) => e.employee_id)
        : [],
    });
  }, [project]);

  /* =========================
     HANDLERS
  ========================= */
  const handleManagerChange = (e) => {
    setFormData((p) => ({
      ...p,
      project_manager_id: e.target.value,
    }));
  };

  const toggleTeamMember = (employee_id) => {
    setFormData((p) => ({
      ...p,
      team_member_ids: p.team_member_ids.includes(employee_id)
        ? p.team_member_ids.filter((id) => id !== employee_id)
        : [...p.team_member_ids, employee_id],
    }));
  };

  /* =========================
     SUBMIT (ONLY 2 FIELDS)
  ========================= */
  const handleSubmit = async () => {
    const data = new FormData();

    // ✅ ONLY FIELDS BACKEND ACCEPTS
    data.append("project_manager_id", formData.project_manager_id);

    formData.team_member_ids.forEach((empId) => {
      data.append("team_member_ids", empId);
    });

    const result = await dispatch(
      editProject({
        projectId: project.project_id || project.id,
        formData: data,
      })
    );

    if (editProject.fulfilled.match(result)) {
      navigate(`/projects/${project.project_id || project.id}`);
    }
  };

  if (singleStatus === "loading") {
    return <p className="text-center mt-10">Loading project…</p>;
  }

  if (!project) {
    return <p className="text-center mt-10">Project not found</p>;
  }

  /* =========================
     UI
  ========================= */
  return (
  <div className="min-h-screen bg-gray-100 px-6 py-5">
    {/* HEADER */}
    <div className="flex justify-between mb-6">
      <h1 className="text-xl font-semibold">Edit Project</h1>
      <button
        onClick={handleSubmit}
        disabled={editStatus === "loading"}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {editStatus === "loading" ? "Updating…" : "Update Project"}
      </button>
    </div>

    {/* FORM */}
    <div className="bg-white p-6 rounded shadow">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <Input label="Project Name" value={formData.project_name} disabled />
          <Input label="Client Name" value={formData.client_name} disabled />

          <Textarea
            label="Description"
            value={formData.description}
            disabled
          />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" value={formData.start_date} disabled />
            <Input label="End Date" value={formData.end_date} disabled />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4 py-3">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Priority" value={formData.priority} disabled />
            <Input label="Project Type" value={formData.project_type} disabled />
          </div>

          {/* PROJECT MANAGER */}
          <Select
            label="Project Manager"
            value={formData.project_manager_id}
            onChange={handleManagerChange}
            options={managers.map((m) => ({
              value: m.employee_id,
              label: m.name,
            }))}
          />

          {/* TEAM MEMBERS */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Team Members
            </label>
            <div className="border rounded p-3 space-y-2 max-h-48 overflow-y-auto">
              {employees.map((emp) => (
                <label
                  key={emp.employee_id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={formData.team_member_ids.includes(emp.employee_id)}
                    onChange={() => toggleTeamMember(emp.employee_id)}
                  />
                  {emp.name}
                </label>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);

}

/* =========================
   REUSABLE COMPONENTS
========================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-xs mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-xs mb-1">{label}</label>
    <textarea
      {...props}
      rows={3}
      className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-xs mb-1">{label}</label>
    <select
      {...props}
      className="w-full border rounded px-3 py-2 text-sm bg-white"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);
