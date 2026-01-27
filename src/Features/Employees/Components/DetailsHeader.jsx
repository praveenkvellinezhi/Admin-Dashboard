import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEmployee,fetchEmployees } from "../../../Redux/Slices/employeeslice";
import { fetchInterns } from "../../../Redux/Slices/internSlice";
export default function EmployeeDetailsHeader({ employee }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!employee) return null;

  const emp = employee.employee ?? employee;
  const isIntern = emp.employment_type === "intern";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    const result = await dispatch(deleteEmployee(emp.employee_id));

   if (deleteEmployee.fulfilled.match(result)) {
    await dispatch(fetchEmployees());
    await dispatch(fetchInterns());
  navigate(isIntern ? "/interns" : "/employees");
}

  };

  return (
    <div className="border-b bg-white px-7 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        {isIntern ? "Intern Details" : "Employee Details"}
      </h1>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <button
          onClick={() => navigate(`/employees/edit/${emp.employee_id}`)}
          className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-3 py-1.5 border border-red-300 text-red-600 rounded-md text-sm"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
