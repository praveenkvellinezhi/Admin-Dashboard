import React from "react";
import { Mail, Phone } from "lucide-react";



export default function BasicInformation({ employee }) {
  const emp = employee?.employee;
  if (!emp) return null;

  const capitalize = (val) =>
    val ? String(val).charAt(0).toUpperCase() + String(val).slice(1) : "—";

  return (
    <div className="space-y-4 mt-4">

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div className="flex items-center gap-4">
          <img
            src={emp.profile_image_url || "https://via.placeholder.com/100"}
            alt={emp.name}
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-xl font-semibold uppercase">
              {capitalize(emp.name)}
            </h2>
            <p className="text-sm text-gray-500">
              {capitalize(emp.role || emp.department) }
            </p>

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {emp.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone size={16} />
                {emp.phone}
              </span>
            </div>
          </div>
        </div>

        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          {capitalize(emp.status || "Active")}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatCard label="Employee ID" value={emp.employee_id} />
  <StatCard label="Department" value={capitalize(emp.department)} />
  <StatCard
    label="Employee Type"
    value={capitalize(emp.employment_type)}
  />
  <StatCard
    label="Joined On"
    value={emp.joining_date}
  />
   <StatCard
    label="Gender"
    value={capitalize(emp.gender)}
  />
</div>

    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-1">
        {value || "—"}
      </p>
    </div>
  );
}
