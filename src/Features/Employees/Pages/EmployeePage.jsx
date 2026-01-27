import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import EmployeeHeader from "../Components/EmployeeHeader";
import EmployeeList from "../Components/EmployeeList";

import {
  fetchEmployees,
  selectAllEmployees,
  getEmployeeError,
  getEmployeeStatus,
} from "../../../Redux/Slices/employeeslice";

export default function EmployeePage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  const dispatch = useDispatch();

  const employees = useSelector(selectAllEmployees);
  const status = useSelector(getEmployeeStatus);
  const error = useSelector(getEmployeeError);

  /* =========================
     FETCH EMPLOYEES
  ========================= */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  /* =========================
     LOADING & ERROR
  ========================= */
  if (status === "loading") {
    return (
      <p className="text-center mt-10 text-lg">
        Loading...
      </p>
    );
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }


  const filteredEmployees = employees.filter((emp) => {
    const searchText = search.toLowerCase();

    const name = emp.name?.toLowerCase() || "";
    const roleValue = emp.role || "";

    return (
      (role === "All" || roleValue === role) &&
      name.includes(searchText)
    );
  });

  
  return (
    <div>
      <EmployeeHeader
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />

      {filteredEmployees.length === 0 ? (
        <p className="text-center mt-16 text-gray-500 text-lg">
          No employees found
        </p>
      ) : (
        <EmployeeList employees={filteredEmployees} />
      )}
    </div>
  );
}
