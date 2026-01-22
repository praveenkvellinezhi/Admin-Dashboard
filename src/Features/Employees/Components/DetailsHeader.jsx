import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
export default function EmployeeDetailsHeader({ employee }) {
  const navigate = useNavigate();
 
  

  if (!employee) return null; // ⛔ don’t render yet

    const isIntern = employee?.employee?.employment_type === "intern";

  return (
    <div className="border-gray-200">
      <div className="mx-auto px-7 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          {isIntern ? "Intern Details" : "Employee Details"}
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white text-sm hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
          {isIntern ? "Back To Intern List" : "Back To Employee List"}
        </button>
      </div>
    </div>
  );
}
