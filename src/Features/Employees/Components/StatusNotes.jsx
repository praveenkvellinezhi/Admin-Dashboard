import React from "react";
import {
  Activity,
  CheckCircle,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

export default function StatusNotes({ employee }) {
  const emp = employee?.employee;
  if (!emp) return null;

     const capitalize = (val) =>
    val ? String(val).charAt(0).toUpperCase() + String(val).slice(1) : '—';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
          <Activity size={18} className="text-blue-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Status & Notes
        </h3>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-6 space-y-6">
        {/* EMPLOYMENT STATUS */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
            Employment Status
          </p>

          <div className="flex items-center gap-4">
            <StatusIcon status={emp.status} />
            <StatusBadge status={emp.status} />
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================
   STATUS BADGE (UNCHANGED LOGIC)
========================= */
function StatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={`px-5 py-2 rounded-full text-sm font-medium
        ${
          isActive
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
        }
      `}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

/* =========================
   STATUS ICON
========================= */
function StatusIcon({ status }) {
  const isActive = status === "active";

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center
        ${
          isActive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }
      `}
    >
      <CheckCircle size={20} />
    </div>
  );
}

/* =========================
   INFO CARD
========================= */
function InfoCard({ icon, label, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}
