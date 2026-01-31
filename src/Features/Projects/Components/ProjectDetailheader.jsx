import React from "react";  
import { ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectDetailsHeader({
  onEdit,
  onDelete,
  onAddPhase, 
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F3F6FF] px-6 py-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Project Details</h1>

         <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 px-4 py-2 border-2
                       border-gray-500 text-gray-600 text-sm font-medium
                       rounded-lg hover:bg-gray-900"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          {/* ADD PHASE */}
          <button
            onClick={onAddPhase}
            className="flex items-center gap-2 px-4 py-2
                       bg-black text-white text-sm font-medium
                       rounded-lg hover:bg-gray-900"
          >
            <Plus size={16} />
            Add Phase
          </button>

          {/* EDIT */}
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2
                       text-sm font-medium border border-gray-300
                       rounded-lg bg-white hover:bg-gray-50"
          >
            <Pencil size={16} />
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2
                       text-sm font-medium text-white
                       bg-red-600 rounded-lg hover:bg-red-700"
          >
            <Trash2 size={16} />
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
