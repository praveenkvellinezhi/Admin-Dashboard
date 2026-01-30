import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EmployeeDetailsHeader from "../Components/DetailsHeader";
import BasicInformation from "../Components/BasicInformation";
import SalaryEmploymentDetails from "../Components/SalaryEmploymentDetails";
import OngoingProjects from "../Components/OngoingProjects";
import DocumentsCard from "../Components/DocumentsCard";
import StatusNotes from "../Components/StatusNotes";

import {
  fetchEmployeesById,
  selectSelectedEmployee,
  getSingleEmployeeStatus,
  deleteEmployee,
} from "../../../Redux/Slices/employeeslice";

export default function EmployeePageDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector(selectSelectedEmployee);
  const status = useSelector(getSingleEmployeeStatus);

  /* =========================
     FETCH EMPLOYEE
  ========================= */
  useEffect(() => {
    dispatch(fetchEmployeesById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading employee details...
      </p>
    );
  }

  if (!employee) {
    return (
      <p className="text-center mt-10 text-red-500">
        Employee not found
      </p>
    );
  }

  const emp = employee.employee ?? employee;
  const isIntern = emp.employment_type === "intern";

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async () => {
    const ok = window.confirm(
      `Are you sure you want to delete ${emp.name}?`
    );
    if (!ok) return;

    await dispatch(deleteEmployee(emp.employee_id));
    navigate(isIntern ? "/interns" : "/employees");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ✅ FULL WIDTH HEADER */}
      <EmployeeDetailsHeader
        employee={employee}
        onEdit={() =>
          navigate(
            isIntern
              ? `/interns/edit/${emp.employee_id}`
              : `/employees/edit/${emp.employee_id}`
          )
        }
        onDelete={handleDelete}
      />

      {/* ✅ CENTERED CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <BasicInformation employee={employee} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalaryEmploymentDetails employee={employee} />
          <OngoingProjects employee={employee} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentsCard employee={employee} />
          <StatusNotes employee={employee} />
        </div>
      </div>
    </div>
  );
}
