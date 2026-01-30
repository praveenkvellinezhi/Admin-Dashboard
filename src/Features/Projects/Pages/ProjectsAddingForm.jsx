import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  DollarSign,
  FileText,
  Mail,
  Phone,
  Upload,
  User,
  Users,
  X,
  Building2,
  Flag,
  Layers,
} from "lucide-react";

/* =========================
   REDUX
========================= */
import {
  fetchEmployees,
  selectAllEmployees,
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

  const employees = useSelector(selectAllEmployees) || [];
  const addStatus = useSelector(getAddProjectStatus);

  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployees());
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
      const digits = value.replace(/\D/g, "");
      if (digits.length > 10) return;
      setFormData((p) => ({ ...p, client_contact: digits }));
      return;
    }

    if (files) {
      const file = files[0];
      setFormData((p) => ({ ...p, [name]: file }));
      setLogoPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* =========================
     TEAM TOGGLE
  ========================= */
  const toggleTeamMember = (id) => {
    setFormData((p) => ({
      ...p,
      team_members: p.team_members.includes(id)
        ? p.team_members.filter((x) => x !== id)
        : [...p.team_members, id],
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) return;

      if (key === "team_members") {
        value.forEach((id) => data.append("team_member_ids", id));
      } else {
        data.append(key, value);
      }
    });

    const res = await dispatch(addProject(data));

    if (addProject.fulfilled.match(res)) {
      toast.success("Project added successfully");
      navigate("/projects");
    }
  };

  const selectedMembers = employees.filter((e) =>
    formData.team_members.includes(e.employee_id)
  );

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
              <h1 className="text-lg font-semibold">Create New Project</h1>
              <p className="text-sm text-gray-500">
                Dashboard / Projects / New
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={addStatus === "loading"}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {addStatus === "loading" ? "Saving..." : <><Check className="h-4 w-4" /> Save Project</>}
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className=" mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Card icon={<Briefcase />} title="Project Details">
            <Input label="Project Name" name="project_name" value={formData.project_name} onChange={handleChange} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Project Type" name="project_type" value={formData.project_type} onChange={handleChange}
                options={[
                  { value: "web", label: "Web" },
                  { value: "app", label: "Mobile App" },
                  { value: "webapp", label: "Web App" },
                ]}
              />
              <Select label="Priority" name="priority" value={formData.priority} onChange={handleChange}
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
              />
            </div>
            <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
          </Card>

          <Card icon={<Building2 />} title="Client Info">
            <Input label="Client Name" name="client_name" value={formData.client_name} onChange={handleChange} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Email" name="client_email" value={formData.client_email} onChange={handleChange} />
              <Input label="Contact" name="client_contact" value={formData.client_contact} onChange={handleChange} />
            </div>
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
            <Select
              label="Project Manager"
              name="project_manager_id"
              value={formData.project_manager_id}
              onChange={handleChange}
              options={employees.map((e) => ({
                value: e.employee_id,
                label: e.name,
              }))}
            />

            {/* TEAM MULTI */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTeamOpen(!isTeamOpen)}
                className="w-full border rounded-lg px-4 py-3 flex justify-between text-sm bg-white"
              >
                {formData.team_members.length === 0
                  ? "Select team members"
                  : `${formData.team_members.length} selected`}
                <ChevronDown />
              </button>

              {isTeamOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white border rounded-lg shadow">
                  {employees.map((emp) => (
                    <label key={emp.employee_id} className="flex gap-2 px-3 py-2 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.team_members.includes(emp.employee_id)}
                        onChange={() => toggleTeamMember(emp.employee_id)}
                      />
                      {emp.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card icon={<DollarSign />} title="Budget">
            <Input label="Total Budget" name="total_budget" value={formData.total_budget} onChange={handleChange} />
          </Card>

          <Card icon={<Upload />} title="Project Logo">
            <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center cursor-pointer">
              {logoPreview ? (
                <img src={logoPreview} className="h-24 w-24 rounded-lg object-cover" />
              ) : (
                <Upload />
              )}
              <input type="file" name="project_logo" onChange={handleChange} hidden />
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
  <div className="bg-white rounded-xl  p-6 shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <h2 className="font-semibold">{title}</h2>
    </div>
    {children}
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
    <textarea {...props} rows={3} className="w-full border border-gray-300  rounded-lg px-4 py-3 text-sm" />
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
