import React from "react";
import { X, Trash2 } from "lucide-react";

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  title = "Delete Item",
  description = "Are you sure you want to delete this item?",
  loading = false,
}) {
  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="bg-white w-full max-w-md rounded-xl shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div className="px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="text-red-600" size={18} />
              </div>
              <p className="text-sm text-gray-600">
                {description}
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 px-5 py-4 ">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm  rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md
                         hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
