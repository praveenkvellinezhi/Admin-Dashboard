import React, { useEffect, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  addPhase,
  getPhaseAddStatus,
  getPhaseError,
  selectAllPhases,
} from '../../../Redux/Slices/phaseSlice';

import {
  fetchEmployees,
  selectAllEmployees,
} from '../../../Redux/Slices/employeeslice';

import {
  fetchProjectById,
  selectSelectedProject,
} from '../../../Redux/Slices/projectSlice';

export default function AddPhaseModal({ onClose }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const employees = useSelector(selectAllEmployees) || [];
  const phases = useSelector(selectAllPhases) || [];
  const project = useSelector(selectSelectedProject);

  const addStatus = useSelector(getPhaseAddStatus);
  const error = useSelector(getPhaseError);

  const projectTeam = project?.team_members || [];

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [localError, setLocalError] = useState('');

  const [formData, setFormData] = useState({
    project_id: id,
    phase_type: '',
    description: '',
    start_date: '',
    end_date: '',
    employee_ids: [],
  });


  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setLocalError('');
  };

  const toggleAssign = (employee_id) => {
    setFormData((p) => ({
      ...p,
      employee_ids: p.employee_ids.includes(employee_id)
        ? p.employee_ids.filter((x) => x !== employee_id)
        : [...p.employee_ids, employee_id],
    }));
  };

// submit
  const handleSubmit = async () => {
    if (!formData.phase_type) {
      setLocalError('Phase type is required');
      return;
    }

    const exists = phases.some(
      (p) =>
        String(p.project_id) === String(id) &&
        p.phase_type === formData.phase_type
    );

    if (exists) {
      setLocalError(`${formData.phase_type} phase already exists`);
      return;
    }

    const invalidEmployees = formData.employee_ids.filter(
      (empId) => !projectTeam.some((tm) => tm.employee_id === empId)
    );

    if (invalidEmployees.length > 0) {
      setLocalError('Selected employees must belong to the project team');
      return;
    }

    const result = await dispatch(addPhase(formData));

    if (addPhase.fulfilled.match(result)) {
      dispatch(fetchProjectById(id));
      toast.success('Phase added successfully');
      onClose();
    }
  };


  const employeeSource = projectTeam.length > 0 ? projectTeam : employees;

  const assignedEmployees = employeeSource.filter((emp) =>
    formData.employee_ids.includes(emp.employee_id)
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-start px-6 py-5 ">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <ChevronDown className="rotate-180 text-gray-600" size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Add Project Phase
              </h2>
              <p className="text-sm text-gray-500">
                Create a new phase to organize your project workflow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {(localError || error?.non_field_errors) && (
            <p className="text-xs text-red-600">
              {localError || error.non_field_errors[0]}
            </p>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Phase Type
            </label>
            <select
              name="phase_type"
              value={formData.phase_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="">Select a phase type</option>
              {[
                'planning',
                'design',
                'development',
                'testing',
                'deployment',
              ].map((type) => (
                <option
                  key={type}
                  value={type}
                  disabled={phases.some(
                    (p) =>
                      String(p.project_id) === String(id) &&
                      p.phase_type === type
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none"
              placeholder="Describe what this phase will accomplish..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Assign Team Members
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAssignOpen((p) => !p)}
                className="w-full flex justify-between items-center border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
              >
                <span className="truncate text-gray-500">
                  {formData.employee_ids.length === 0
                    ? 'Select team members'
                    : assignedEmployees.map((e) => e.name).join(', ')}
                </span>
                <ChevronDown size={16} />
              </button>

              {isAssignOpen && (
                <div className="absolute z-20 mt-1 w-full max-h-40 overflow-y-auto border rounded-lg bg-white shadow-md">
                  {employeeSource.map((emp) => (
                    <label
                      key={emp.employee_id}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.employee_ids.includes(
                          emp.employee_id
                        )}
                        onChange={() => toggleAssign(emp.employee_id)}
                      />
                      {emp.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {assignedEmployees.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {assignedEmployees.map((emp) => (
                <span
                  key={emp.employee_id}
                  className="flex items-center gap-2 px-3 py-1.5
                     rounded-full border bg-gray-50 text-sm"
                >
                  {emp.name}
                  <button onClick={() => toggleAssign(emp.employee_id)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

    
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-300">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={addStatus === 'loading'}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            {addStatus === 'loading' ? 'Adding...' : 'Add Phase'}
          </button>
        </div>
      </div>
    </div>
  );
}
