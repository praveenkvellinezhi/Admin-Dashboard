import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {fetchEmployees,fetchManagers,selectAllEmployees,selectAllManagers,} from "../../../Redux/Slices/employeeslice";
import {addProject,getAddProjectStatus,} from "../../../Redux/Slices/projectSlice";

export default function ProjectAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector(selectAllEmployees);
  const managers = useSelector(selectAllManagers);
  const addStatus = useSelector(getAddProjectStatus);

  const [isTeamOpen, setIsTeamOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchManagers());
  }, [dispatch]);

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

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-5">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Add New Project
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Dashboard &gt; Project &gt; Add Project
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm rounded-lg border bg-white">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm rounded-lg border bg-white">
            Save as Draft
          </button>
          <button
            onClick={handleSubmit}
            disabled={addStatus === "loading"}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white
                       hover:bg-blue-700 disabled:opacity-60"
          >
            {addStatus === "loading" ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white  shadow-sm p-6  mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <Section title="Project Details">
              <Input
                label="Project Name"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
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
              <Input
                label="Client Name"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
              />
              <Input
                label="Client Email"
                type="email"
                name="client_email"
                value={formData.client_email}
                onChange={handleChange}
              />
              <Textarea
                label="Project Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Section>

            <Section title="Timeline & Duration">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
                <Input
                  label="End Date"
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section title="Team & Responsibility">
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

              <div className="relative">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Team Members
                </label>

                <button
                  type="button"
                  onClick={() => setIsTeamOpen((p) => !p)}
                  className="w-full flex justify-between items-center rounded-lg border
                             px-3 py-2 text-sm bg-white"
                >
                  <span className="truncate">
                    {formData.team_members.length === 0
                      ? "Select team members"
                      : employees
                        .filter((e) => formData.team_members.includes(e.id))
                        .map((e) => e.name)
                        .join(", ")}
                  </span>
                  <span className="text-gray-400">▾</span>
                </button>

                {isTeamOpen && (
                  <div
                    className="absolute z-20 mt-1 w-full max-h-56 overflow-auto
                                  border border-gray-300 rounded-lg  bg-white shadow"
                  >
                    {employees.map((emp) => (
                      <label
                        key={emp.id}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.team_members.includes(emp.id)}
                          onChange={() => toggleTeamMember(emp.id)}
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

            <Section title="Budget">
              <Input
                label="Total Budget"
                name="total_budget"
                value={formData.total_budget}
                onChange={handleChange}
              />
            </Section>

            <Section title="Project Logo">
              <input
                type="file"
                name="project_logo"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full  border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
      className="w-full border border-gray-300 rounded-lg  px-3 py-2 text-sm bg-white"
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
