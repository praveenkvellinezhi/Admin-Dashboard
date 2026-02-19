import React from "react";
export default function ProfileCard({ employee }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 text-center">
      <img
        src={employee.image || "https://i.pravatar.cc/150"}
        alt={employee.name}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />

      <h3 className="font-semibold text-lg">{employee.name}</h3>
      <p className="text-sm text-gray-500">{employee.role}</p>
      <p className="text-xs text-gray-400 mt-1">
        {employee.employee_id}
      </p>
    </div>
  );
}
