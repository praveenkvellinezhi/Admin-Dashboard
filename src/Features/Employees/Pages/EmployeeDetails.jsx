import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BasicInformation from "../Components/BasicInformation";
import SalaryEmploymentDetails from "../Components/SalaryEmploymentDetails";
import EmployeeDetailsHeader from "../Components/DetailsHeader";
import OngoingProjects from "../Components/OngoingProjects";
import DocumentsCard from "../Components/DocumentsCard";
import StatusNotes from "../Components/StatusNotes";

import {
  fetchEmployeesById,
  selectSelectedEmployee,
  getSingleEmployeeStatus,
} from "../../../Redux/Slices/employeeslice";

export default function EmployeePageDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const employee = useSelector(selectSelectedEmployee);
  const status = useSelector(getSingleEmployeeStatus);

  useEffect(() => {
    dispatch(fetchEmployeesById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (status === "failed" || !employee) {
    return (
      <p className="text-center mt-10 text-red-500">
        Employee not found
      </p>
    );
  }

  return (
    <div className="min-h-screen">
      <EmployeeDetailsHeader employee={employee} />

      {/* PAGE CONTENT */}
      <div className=" mx-auto px-6 py-6 space-y-6">
        {/* BASIC INFORMATION (FULL WIDTH) */}
        <BasicInformation employee={employee} />

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <SalaryEmploymentDetails employee={employee} />
          <OngoingProjects employee={employee} />
        </div>

        {/* THIRD ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <DocumentsCard employee={employee} />
          <StatusNotes employee={employee} />
        </div>
      </div>
    </div>
  );
}
