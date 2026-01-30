import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Users,
  Building2,
  Upload,
  X,
} from "lucide-react";

/* =========================
   REDUX
========================= */
import {
  fetchEmployees,
  selectAllEmployees,
} from "../../../Redux/Slices/employeeslice";

import {
  fetchProjectById,
  editProject,
  selectSelectedProject,
  getSingleProjectStatus,
  getEditProjectStatus,
} from "../../../Redux/Slices/projectSlice";

/* =========================
   COMPONENT
========================= */
export default function ProjectEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const employees = useSelector(selectAllEmployees) || [];
  const project = useSelector(selectSelectedProject);
  const singleStatus = useSelector(getSingleProjectStatus);
  const editStatus = useSelector(getEditProjectStatus);

  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
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
    project_manager_id: "",
    team_member_ids: [],
    project_logo: null,
  });

  /* =========================
     PREFILL
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
      team_member_ids:
        project.team_members?.map((e) => e.employee_id) || [],
      project_logo: null,
    });

    // 🔥 existing logo preview
    if (project.project_logo) {
      setLogoPreview(project.project_logo);
    }
  }, [project]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((p) => ({ ...p, [name]: file }));
      setLogoPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toggleTeamMember = (id) => {
    setFormData((p) => ({
      ...p,
      team_member_ids: p.team_member_ids.includes(id)
        ? p.team_member_ids.filter((x) => x !== id)
        : [...p.team_member_ids, id],
    }));
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setFormData((p) => ({ ...p, project_logo: null }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "project_logo") return;

      if (Array.isArray(value)) {
        value.forEach((v) => data.append(key, v));
      } else {
        data.append(key, value);
      }
    });

    const res = await dispatch(
      editProject({
        projectId: project.project_id || project.id,
        formData: data,
      })
    );

    if (editProject.fulfilled.match(res)) {
      navigate(`/projects/${project.project_id || project.id}`);
    }
  };

  if (singleStatus === "loading") {
    return <p className="text-center mt-10">Loading project…</p>;
  }

  if (!project) {
    return <p className="text-center mt-10">Project not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="h-9 w-9 rounded-lg border flex items-center justify-center hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">Edit Project</h1>
              <p className="text-sm text-gray-500">
                Dashboard / Projects / Edit
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={editStatus === "loading"}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {editStatus === "loading" ? "Updating…" : (
              <>
                <Check className="h-4 w-4" />
                Update Project
              </>
            )}
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className=" mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Card icon={<Briefcase />} title="Project Details">
            <Input label="Project Name" name="project_name" value={formData.project_name} onChange={handleChange} />
            <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
                  <Select label="Project Status" name="status" value={formData.status} onChange={handleChange}
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "inprogress", label: "Ongoing" },
                  { value: "completed", label: "Completed" },
                ]}
              />
          </Card>

          <Card icon={<Building2 />} title="Client">
            <Input label="Client Name" name="client_name" value={formData.client_name} onChange={handleChange} />
          </Card>

          <Card icon={<Calendar />} title="Timeline">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input type="date" label="Start Date" name="start_date" value={formData.start_date} onChange={handleChange} />
              <Input type="date" label="End Date" name="end_date" value={formData.end_date} onChange={handleChange} />
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Card icon={<Users />} title="Team">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTeamOpen(!isTeamOpen)}
                className="w-full border rounded-lg px-4 py-3 flex justify-between text-sm bg-white"
              >
                {formData.team_member_ids.length === 0
                  ? "Select team members"
                  : `${formData.team_member_ids.length} selected`}
                <ChevronDown />
              </button>

              {isTeamOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white  rounded-lg shadow max-h-56 overflow-auto">
                  {employees.map((emp) => (
                    <label
                      key={emp.employee_id}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
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
              )}
            </div>
          </Card>

          {/* 🔥 LOGO EDIT */}
          <Card icon={<Upload />} title="Project Logo">
            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6">
              {logoPreview ? (
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="Logo"
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeLogo();
                    }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 mb-2 text-gray-500" />
                  <p className="text-sm">Click to upload</p>
                </>
              )}
              <input
                type="file"
                name="project_logo"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </Card>
        </div>
      </main>
    </div>
  );
}

/* =========================
   UI HELPERS
========================= */
const Card = ({ icon, title, children }) => (
  <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <h2 className="font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);
const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium mb-1 block">{label}</label>
    <select {...props} className="w-full border  border-gray-300  rounded-lg px-4 py-3 text-sm">
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium mb-1 block">{label}</label>
    <input {...props} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium mb-1 block">{label}</label>
    <textarea {...props} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" />
  </div>
);
