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
  selectedProject,
  getSingleprojectStatus,
  getEditProjectStatus,
} from "../../../Redux/Slices/projectSlice";

export default function ProjectEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const employees = useSelector(selectAllEmployees);
  const managers = useSelector(selectAllManagers);

  const project = useSelector(selectedProject);
  const singleStatus = useSelector(getSingleprojectStatus);
  const editStatus = useSelector(getEditProjectStatus);


  /* =========================
     FETCH REQUIRED DATA
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchManagers());

    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

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
     PREFILL FORM WHEN DATA LOADS ✅
  ========================= */
  useEffect(() => {
    if (project) {
      setFormData({
        project_name: project.project_name || "",
        description: project.description || "",
        client_name: project.client_name || "",
        client_email: project.client_email || "",
        client_contact: project.client_contact || "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        priority: project.priority || "",
        project_type: project.project_type || "",
        project_manager: project.project_manager || "",
        team_members: project.team_members || [],
        total_budget: project.total_budget || "",
        project_logo: null, // don’t prefill file input
      });
    }
  }, [project]);

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
     SUBMIT (EDIT PROJECT) ✅
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

  /* =========================
     STATES
  ========================= */
  if (singleStatus === "loading") {
    return <p className="text-center mt-10">Loading project...</p>;
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Edit Project</h1>

        <button
          onClick={handleSubmit}
          disabled={editStatus === "loading"}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
        >
          {editStatus === "loading" ? "Updating..." : "Update Project"}
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-6">
            <Input label="Project Name" name="project_name" value={formData.project_name} onChange={handleChange} />
            <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
            <Input label="Client Name" name="client_name" value={formData.client_name} onChange={handleChange} />
            <Input label="Client Email" name="client_email" value={formData.client_email} onChange={handleChange} />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Select
              label="Project Manager"
              name="project_manager"
              value={formData.project_manager}
              onChange={handleChange}
              options={managers.map((m) => ({ value: m.id, label: m.name }))}
            />

            {/* TEAM MEMBERS */}
            <div>
              <label className="text-xs font-medium">Team Members</label>
              <div className="border rounded-lg p-2">
                {employees.map((emp) => (
                  <label key={emp.id} className="flex gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.team_members.includes(emp.id)}
                      onChange={() => toggleTeamMember(emp.id)}
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
   INPUT HELPERS
========================= */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-xs mb-1">{label}</label>
    <input {...props} className="w-full border rounded px-3 py-2 text-sm" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-xs mb-1">{label}</label>
    <textarea {...props} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-xs mb-1">{label}</label>
    <select {...props} className="w-full border rounded px-3 py-2 text-sm">
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);
