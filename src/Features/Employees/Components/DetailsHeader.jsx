import React, { useState } from "react";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  deleteEmployee,
  fetchEmployees,
} from "../../../Redux/Slices/employeeslice";
import { fetchInterns } from "../../../Redux/Slices/internSlice";

// 🔥 Reusable delete modal
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
      {/* HEADER */}
      <div className="border-b  bg-white px-2 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          {isIntern ? "Intern Details" : "Employee Details"}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/employees")}
            className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <button
            onClick={() =>
              navigate(`/employees/edit/${emp.employee_id}`)
            }
            className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-2 px-3 py-1.5
                       border border-red-300 text-red-600
                       rounded-md text-sm hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
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
