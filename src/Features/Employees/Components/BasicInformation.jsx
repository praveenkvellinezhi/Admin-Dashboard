import React from 'react';
import {
  Mail,
  Phone,
  MapPinned,
  BadgeCheck,
  Briefcase,
  Calendar,
  User,
} from 'lucide-react';

export default function BasicInformation({ employee }) {
  const emp = employee?.employee;
  if (!emp) return null;

   const capitalize = (val) =>
    val ? String(val).charAt(0).toUpperCase() + String(val).slice(1) : '—';

  return (
    <div className="space-y-6 mt-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={emp.profile_image_url || 'https://via.placeholder.com/120'}
              alt={emp.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
            />
            {/* ACTIVE DOT */}
            <span
              className={`absolute bottom-2 right-2 w-4 h-4 border-2 border-white rounded-full
    ${emp.status?.toLowerCase() === 'inactive' ? 'bg-red-500' : 'bg-green-500'}
  `}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {capitalize(emp.name)}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {capitalize(emp.role || emp.department)}
            </p>

            {/* CONTACT INFO */}
            <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {emp.email}
              </span>

              <span className="flex items-center gap-2">
                <Phone size={16} />
                {emp.phone}
              </span>

              <span className="flex items-center gap-2">
                <MapPinned size={16} />
                {emp.address}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <span
            className={`px-4 py-2 rounded-full text-white text-sm font-medium
    ${emp.status === 'inactive' ? 'bg-red-600' : 'bg-green-600'}
  `}
          >
            {capitalize(emp.status || 'Active')}
          </span>

          <span className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium flex items-center gap-2">
            <Briefcase size={14} />
            {capitalize(emp.department)}
          </span>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          icon={<BadgeCheck size={18} />}
          label="Employee ID"
          value={emp.employee_id}
        />

        <StatCard
          icon={<Briefcase size={18} />}
          label="Department"
          value={capitalize(emp.department)}
        />

        <StatCard
          icon={<User size={18} />}
          label="Employee Type"
          value={capitalize(emp.employment_type)}
        />

        <StatCard
          icon={<Calendar size={18} />}
          label="Joined On"
          value={emp.joining_date}
        />

        <StatCard
          icon={<User size={18} />}
          label="Gender"
          value={capitalize(emp.gender)}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-900 mt-1">
          {value || '—'}
        </p>
      </div>

      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
        {icon}
      </div>
    </div>
  );
}
