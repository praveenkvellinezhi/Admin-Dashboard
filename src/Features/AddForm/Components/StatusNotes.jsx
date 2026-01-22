export default function StatusNotes({ formData, onChange }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 py-2 border-b bg-gray-50 rounded-t-lg text-center">
        <h3 className="text-sm font-semibold text-gray-700">Status & Notes</h3>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Employee Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
          <label className="text-sm text-gray-700 md:col-span-1">
            Employee Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="md:col-span-3 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
          <label className="text-sm text-gray-700 md:col-span-1">
            Notes & Remarks
          </label>

          
          <input
            type="text"
            name="notes"
            value={formData.notes || ""} // ✅ fallback
            onChange={onChange}
            placeholder="Add any additional notes here..."
            className="md:col-span-3 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
