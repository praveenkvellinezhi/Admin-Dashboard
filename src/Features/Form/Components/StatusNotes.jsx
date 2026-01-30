import React from "react";
import { ClipboardList } from "lucide-react";

export default function StatusNotes({ formData, onChange }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
        <div className="p-2 bg-gray-200 rounded-lg">
          <ClipboardList size={18} className="text-gray-700" />
        </div>
        <h3 className="text-base font-semibold text-gray-800">
          Status & Notes
        </h3>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">
        {/* EMPLOYEE STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-sm font-medium text-gray-700 md:col-span-1">
            Employee Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="
              md:col-span-3 w-full
              rounded-xl border border-gray-300
              px-4 py-3 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

   
      </div>
    </div>
  );
}
