import React from "react";  
import { ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectDetailsHeader({
  onEdit,
  onDelete,
  onAddPhase, // ✅ NEW
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F3F6FF] px-6 py-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Project Details</h1>

        <div className="flex items-center gap-3">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-gray-100"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {/* Add Phase */}
          <button
            onClick={onAddPhase}
            className="flex items-center gap-1 px-3 py-1.5 text-sm
                       bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={14} />
            Add Phase
          </button>

          {/* Edit */}
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-gray-100"
          >
            <Pencil size={14} />
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200
             text-red-600 rounded-md bg-white hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        Dashboard &gt; Projects &gt; Project Details
      </p>
    </div>
  );
}
