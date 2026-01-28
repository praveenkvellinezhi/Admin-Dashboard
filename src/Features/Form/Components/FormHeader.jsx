import React from "react";
export default function PageHeader() {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Add New Employee
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details to create a new employee profile
        </p>
      </div>

      <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
        ← Back to Employee List
      </button>
    </div>
  );
}
