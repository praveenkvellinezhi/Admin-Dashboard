import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import EmployeeHeader from "../Components/EmployeeHeader";
import EmployeeList from "../Components/EmployeeList";
import Loader from "../../../Components/Shared/Loader";

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


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);


  if (status === "loading") {
    return (
   <Loader />
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
  const email = emp.email?.toLowerCase() || "";
  const roleValue = emp.role?.toLowerCase() || "";

  const matchesSearch =
    name.includes(searchText) || email.includes(searchText);

  const matchesRole =
    role === "All" ||
    roleValue.includes(role.toLowerCase());

  return matchesSearch && matchesRole;
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
