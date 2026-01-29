import React from "react";
export default function StatusNotes({ employee }) {
  const emp = employee?.employee;
  if (!emp) return null;

  return (
    <div className="bg-white  rounded-lg shadow-lg">
      <h3 className="px-4 py-3 border-b font-semibold text-sm">
        Status & Notes
      </h3>

      <div className="p-4 space-y-4 text-sm">
                <div>
          <label className="text-gray-500 block mb-1">
            Employee Status
          </label>

          <StatusBadge status={emp.status} />
        </div>

   
      </div>
    </div>
  );
}

/* ✅ STATUS BADGE */
function StatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        ${
          isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
