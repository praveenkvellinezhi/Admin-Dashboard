import { Trash2, X } from "lucide-react";

export default function DeleteProjectModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-6 z-10">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* ICON */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
          <Trash2 size={22} />
        </div>

        {/* CONTENT */}
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Delete Project
        </h3>

        <p className="text-sm text-gray-500 text-center mt-2">
          Are you sure you want to delete this project?  
          This action cannot be undone.
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white
                       hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
