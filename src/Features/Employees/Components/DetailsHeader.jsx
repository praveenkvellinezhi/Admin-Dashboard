import React, { useState } from "react";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  deleteEmployee,
  fetchEmployees,
} from "../../../Redux/Slices/employeeslice";
import { fetchInterns } from "../../../Redux/Slices/internSlice";

import DeleteModal from "../../../Components/Shared/DeleteModal";

export default function EmployeeDetailsHeader({ employee }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);

  if (!employee) return null;

  const emp = employee.employee ?? employee;
  const isIntern = emp.employment_type === "intern";

  /* =========================
     CONFIRM DELETE
  ========================= */
  const handleConfirmDelete = async () => {
    const result = await dispatch(deleteEmployee(emp.employee_id));

    if (deleteEmployee.fulfilled.match(result)) {
      await dispatch(fetchEmployees());
      await dispatch(fetchInterns());
      navigate(isIntern ? "/interns" : "/employees");
    }

    setShowDelete(false);
  };

  return (
    <>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(isIntern ? "/interns" : "/employees")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <div className="h-6 w-px bg-gray-300" />

            <h1 className="text-lg font-semibold text-gray-900">
              {isIntern ? "Intern Details" : "Employee Details"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                navigate(
                  isIntern
                    ? `/interns/edit/${emp.employee_id}`
                    : `/employees/edit/${emp.employee_id}`
                )
              }
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${isIntern ? "Intern" : "Employee"}`}
        description={`Are you sure you want to delete this ${
          isIntern ? "intern" : "employee"
        }? This action cannot be undone.`}
      />
    </>
  );
}
