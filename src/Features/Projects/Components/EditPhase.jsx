import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editPhase,
  deletePhase,
  selectAllPhases,
} from "../../../Redux/Slices/phaseSlice";
import { fetchProjectById } from "../../../Redux/Slices/projectSlice";

export default function EditPhaseModal({ phaseId, onClose }) {
  const dispatch = useDispatch();

  const phases = useSelector(selectAllPhases);
  const phase = phases.find((p) => p.phase_id === phaseId);

 
  const [formData, setFormData] = useState({
    description: "",
    start_date: "",
    end_date: "",
  });

 
  useEffect(() => {
    if (phase) {
      setFormData({
        description: phase.description || "",
        start_date: phase.start_date || "",
        end_date: phase.end_date || "",
      });
    }
  }, [phase]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
  const result = await dispatch(
    editPhase({
      phaseId,
      payload: formData,
    })
  );

  if (editPhase.fulfilled.match(result)) {
    await dispatch(fetchProjectById(phase.project_id)); 




    onClose(); 
  }
};


  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this phase? All tasks under this phase will be removed."
    );

    if (confirmDelete) {
      dispatch(deletePhase(phaseId));

      onClose();
    }
  };

  if (!phase) return null;


  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Phase</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500">Phase Title</label>
          <input
            value={phase.phase_type}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="text-red-600 border px-4 py-2 rounded"
          >
            Delete Phase
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
