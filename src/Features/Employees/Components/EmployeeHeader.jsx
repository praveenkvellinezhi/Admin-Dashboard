import React from "react";
import { Search, Filter,UserRoundPlus } from "lucide-react";
import CommonHeader from "../../../Components/Shared/CommonHeader";

export default function EmployeeHeader({ search, setSearch, role, setRole}) {
 const roles = [
  "All",
  "MERN Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Flutter Developer",
  "Project Manager"
];


  return (
    <div>

      <CommonHeader 
      title="Employees"
      search={search}
      setSearch={setSearch}
      filterValue={role}
      setFilterValue={setRole}
      filterOptions={roles}
      buttonText="Add Employees"
      navigatePath="/addingform" />
    </div>



  
  );
}
